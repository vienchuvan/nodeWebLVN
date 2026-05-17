const express = require('express');
const db = require('../connectDB')
const app = express();

app.use(express.json());

exports.home = (req, res) => {
  res.send('Trang chủ');
};

exports.menu = async (req, res) => {
  try {
    const [rows] = await db.query( 'SELECT * FROM menu_items'  );
    res.json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err.message
    });
  }
}
exports.setMenu = async (req, res) => {
  try {

    const { idFun, id, label } = req.body;
    if (idFun == 111) {

      await db.query(
        'INSERT INTO menu_items (id, label) VALUES (?, ?)',
        [id, label]
      );

      return res.json({
        success: true,
        message: 'Thêm thành công'
      });

    }
    if (idFun == 112) {

      await db.query(
        'UPDATE menu_items SET label = ? WHERE id = ?',
        [label, id]
      );

      return res.json({
        success: true,
        message: 'Sửa thành công'
      });

    }
    if (idFun == 113) {
      await db.query(
        'DELETE FROM menu_items WHERE id = ?',
        [id]
      );

      return res.json({
        success: true,
        message: 'Xóa thành công'
      });

    }

    return res.status(400).json({
      success: false,
      message: 'idFun không hợp lệ'
    });

  } catch (err) {

    console.log(err);

    return res.status(500).json({
      success: false,
      error: err.message
    });

  }

};

exports.bannerHome = async (req, res) => {
  try {
    const { idFun, id, title, desc, img } = req.body;
    /**
     * 111 = ADD
     */
    if (idFun == 111) {

      await db.query(
        `INSERT INTO home_banners 
        (id, title, \`desc\`, img) 
        VALUES (?, ?, ?, ?)`,
        [id, title, desc, img]
      );

      return res.json({
        success: true,
        message: 'Thêm banner thành công'
      });

    }
    /**
     * 112 = UPDATE
     */
    if (idFun == 112) {

      await db.query(
        `UPDATE home_banners 
         SET title = ?, 
             \`desc\` = ?, 
             img = ?
         WHERE id = ?`,
        [title, desc, img, id]
      );

      return res.json({
        success: true,
        message: 'Sửa banner thành công'
      });

    }

    /**
     * 113 = DELETE
     */
    if (idFun == 113) {

      await db.query(
        `DELETE FROM home_banners 
         WHERE id = ?`,
        [id]
      );

      return res.json({
        success: true,
        message: 'Xóa banner thành công'
      });

    }

    /**
     * 114 = GET ALL
     */
    if (idFun == 114) {

      const [rows] = await db.query(
        `SELECT * FROM home_banners ORDER BY id ASC`
      );

      return res.json({
        success: true,
        data: rows
      });

    }

    return res.status(400).json({
      success: false,
      message: 'idFun không hợp lệ'
    });

  } catch (err) {

    console.log(err);

    return res.status(500).json({
      success: false,
      error: err.message
    });

  }

};

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