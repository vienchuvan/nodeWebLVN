const express = require('express');
const db = require('../connectDB')
const app = express();

app.use(express.json());

exports.home = (req, res) => {
  res.send('Trang chủ');
};

exports.menu = async  (req, res)=>{
 try {
    const [rows] = await db.query(
      'SELECT * FROM menu_items'
    );

    res.json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err.message
    });
  }
}
exports.addMenu = async  (req, res)=>{
  try {

    const {idFun, id, label } = req.body;

    await db.query(
      'INSERT INTO menu_items (id, label) VALUES (?, ?)',
      [id, label]
    );

    res.json({
      success: true
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: err.message
    });

  }

}

exports.about = (req, res) => {
  res.send('Trang giới thiệu');
};

exports.users = (req, res) => {
  res.json([
    {
      id: 1,
      name: 'Vien'
    },
    {
      id: 2,
      name: 'NodeJS'
    }
  ]);
};