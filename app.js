require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const fs = require('fs');

app.use(cors());
const webRoutes = require('./routes/index');
const db = require('./connectDB')

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Serve static files from uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// routes
app.use('/', webRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running`);
});