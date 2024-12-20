const express = require('express');
const app = express();
const connectDB = require('./config/db');
const providersRouter = require('./routes/providers');

// Conectar a la base de datos
connectDB();

app.use(express.json());

app.use('/providers', providersRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
