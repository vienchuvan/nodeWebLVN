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
exports.langMenu = async (req, res) => {
  try {
    const [rows] = await db.query( 'SELECT * FROM languages_menu'  );
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
    console.log("req banner ", req.body);
    
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
exports.getSidebarMenu = async (req, res) => {
  try {
    // lấy category
    const [categories] = await db.query(`
      SELECT *
      FROM sidebar_categories
      ORDER BY id ASC
    `);

    // lấy item
    const [items] = await db.query(`
      SELECT *
      FROM sidebar_items
      ORDER BY id ASC
    `);

    // lấy sub item
    const [subItems] = await db.query(`
      SELECT *
      FROM sidebar_subitems
      ORDER BY id ASC
    `);

    // build data
    const result = categories.map((category) => {
      const categoryItems = items
        .filter((item) => item.category_id === category.id)
        .map((item) => {
          const itemSub = subItems
            .filter((sub) => sub.item_id === item.id)
            .map((sub) => ({
              title: sub.title,
              id: sub.item_key,
            }));

          return {
            title: item.title,
            id: item.item_key,
            subItems: itemSub,
          };
        });

      return {
        category: category.category_name,
        items: categoryItems,
      };
    });

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("GET SIDEBAR ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
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