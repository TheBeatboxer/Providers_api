const express = require('express');
const router = express.Router();
const Provider = require('../models/provider');

// Obtener todos los proveedores
router.get('/', async (req, res) => {
  try {
    const providers = await Provider.find();
    res.json(providers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Crear un nuevo proveedor
router.post('/', async (req, res) => {
  const provider = new Provider({
    name: req.body.name,
    service: req.body.service,
    rating: req.body.rating,
  });

  try {
    const newProvider = await provider.save();
    res.status(201).json(newProvider);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Obtener un proveedor por ID
router.get('/:id', getProvider, (req, res) => {
  res.json(res.provider);
});

// Actualizar un proveedor
router.patch('/:id', getProvider, async (req, res) => {
  if (req.body.name != null) {
    res.provider.name = req.body.name;
  }
  if (req.body.service != null) {
    res.provider.service = req.body.service;
  }
  if (req.body.rating != null) {
    res.provider.rating = req.body.rating;
  }
  try {
    const updatedProvider = await res.provider.save();
    res.json(updatedProvider);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Eliminar un proveedor
router.delete('/:id', getProvider, async (req, res) => {
  try {
    await res.provider.remove();
    res.json({ message: 'Proveedor eliminado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getProvider(req, res, next) {
  let provider;
  try {
    provider = await Provider.findById(req.params.id);
    if (provider == null) {
      return res.status(404).json({ message: 'No se puede encontrar el proveedor' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.provider = provider;
  next();
}

module.exports = router;
