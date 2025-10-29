const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json());

// rutas
app.use('/api/products', require('./routes/products'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/locations', require('./routes/locations'));

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));