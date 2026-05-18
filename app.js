require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
const webRoutes = require('./routes/index');
const db = require('./connectDB')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/', webRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running`);
});