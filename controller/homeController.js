const express = require('express');
const db = require('../connectDB')
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Serve static uploads folder
app.use('/uploads', express.static('uploads'));

// Create uploads folder if not exists
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
});
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

        const { idFun } = req.body;

        // =========================
        // GET MENU
        // =========================
        if (idFun == 100) {

            const [menus] = await db.query(`
                SELECT *
                FROM menu_items
                ORDER BY sort_order ASC
            `);

            // build tree
            const buildTree = (
                parent_id = null
            ) => {

                return menus
                    .filter(
                        item =>
                            item.parent_id ==
                            parent_id
                    )
                    .map(item => ({

                        ...item,

                        name:
                            typeof item.name ===
                            "string"
                                ? JSON.parse(
                                      item.name
                                  )
                                : item.name,

                        children:
                            buildTree(
                                item.id
                            ),
                    }));
            };

            return res.json({
                success: true,
                data: buildTree(),
            });
        }

        // =========================
        // SAVE MENU
        // =========================
        if (idFun == 200) {

            const { menus } = req.body;

            // old ids
            const [oldMenus] =
                await db.query(
                    `
                    SELECT id
                    FROM menu_items
                    `
                );

            const oldIds =
                oldMenus.map(
                    i => String(i.id)
                );

            const newIds = [];

            // recursive save
            const saveRecursive =
                async (
                    items,
                    parent_id = null
                ) => {

                    for (
                        let i = 0;
                        i < items.length;
                        i++
                    ) {

                        const item =
                            items[i];

                        const data = {

                            name: JSON.stringify(
                                item.name
                            ),

                            parent_id,

                            sort_order: i,
                        };

                        // =========================
                        // INSERT
                        // =========================
                        if (item.temp) {

                            const newId =
                                Date.now() +
                                "_" +
                                i;

                            await db.query(
                                `
                                INSERT INTO menu_items
                                (
                                    id,
                                    name,
                                    parent_id,
                                    sort_order
                                )
                                VALUES (?, ?, ?, ?)
                                `,
                                [
                                    newId,
                                    data.name,
                                    data.parent_id,
                                    data.sort_order,
                                ]
                            );

                            item.id =
                                newId;
                        }

                        // =========================
                        // UPDATE
                        // =========================
                        else {

                            await db.query(
                                `
                                UPDATE menu_items
                                SET
                                    name = ?,
                                    parent_id = ?,
                                    sort_order = ?
                                WHERE id = ?
                                `,
                                [
                                    data.name,
                                    data.parent_id,
                                    data.sort_order,
                                    item.id,
                                ]
                            );
                        }

                        newIds.push(
                            String(item.id)
                        );

                        // children
                        if (
                            item.children &&
                            item.children
                                .length > 0
                        ) {

                            await saveRecursive(
                                item.children,
                                item.id
                            );
                        }
                    }
                };

            await saveRecursive(
                menus
            );

            // =========================
            // DELETE
            // =========================
            const deleteIds =
                oldIds.filter(
                    id =>
                        !newIds.includes(
                            id
                        )
                );

            if (
                deleteIds.length > 0
            ) {

                await db.query(
                    `
                    DELETE FROM menu_items
                    WHERE id IN (?)
                    `,
                    [deleteIds]
                );
            }

            return res.json({
                success: true,
                message:
                    "Cập nhật menu thành công",
            });
        }

        return res.status(400).json({
            success: false,
            message:
                "idFun không hợp lệ",
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.setGeneralSettings = async (req, res) => {

    try {

        const { idFun } = req.body;

        // =====================================
        // GET SETTINGS
        // =====================================
        if (idFun == 100) {

            const [rows] = await db.query(`
                SELECT *
                FROM general_settings
                LIMIT 1
            `);

            let data = {};

            if (rows.length > 0) {

                data = rows[0];

                // parse json
                data.languages =
                    typeof data.languages === "string"
                        ? JSON.parse(data.languages)
                        : data.languages;

            } else {

                // default data
                data = {

                    logo: "",

                    hotline: "",

                    email: "",

                    workingHours: "",

                    languages: {
                        vi: {
                            companyName: "",
                            address: "",
                            footerContent: "",
                        },

                        en: {
                            companyName: "",
                            address: "",
                            footerContent: "",
                        },

                        ja: {
                            companyName: "",
                            address: "",
                            footerContent: "",
                        },
                    },
                };
            }

            return res.json({
                success: true,
                data,
            });
        }

        // =====================================
        // SAVE SETTINGS
        // =====================================
        if (idFun == 200) {

            const {
                logo,
                hotline,
                email,
                workingHours,
                languages,
            } = req.body;

            // check exists
            const [exists] = await db.query(`
                SELECT id
                FROM general_settings
                LIMIT 1
            `);

            // update
            if (exists.length > 0) {

                await db.query(
                    `
                    UPDATE general_settings
                    SET
                        logo = ?,
                        hotline = ?,
                        email = ?,
                        workingHours = ?,
                        languages = ?
                    WHERE id = ?
                    `,
                    [
                        logo || "",
                        hotline || "",
                        email || "",
                        workingHours || "",
                        JSON.stringify(
                            languages || {}
                        ),
                        exists[0].id,
                    ]
                );

            }

            // insert
            else {

                await db.query(
                    `
                    INSERT INTO general_settings
                    (
                        logo,
                        hotline,
                        email,
                        workingHours,
                        languages
                    )
                    VALUES (?, ?, ?, ?, ?)
                    `,
                    [
                        logo || "",
                        hotline || "",
                        email || "",
                        workingHours || "",
                        JSON.stringify(
                            languages || {}
                        ),
                    ]
                );
            }

            return res.json({
                success: true,
                message:
                    "Lưu cài đặt thành công",
            });
        }

        return res.status(400).json({
            success: false,
            message: "idFun không hợp lệ",
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.bannerHome = [
  upload.single('banner_image'),
  
  async (req, res) => {
    try {
      const { idFun, id, title, desc, img } = req.body;
      console.log("req banner ", req.body);
      
      /**
       * 111 = ADD
       */
      if (idFun == 111) {
        let bannerImg = img || '';

        // Handle image upload
        if (req.file) {
          const fileName = Date.now() + '.jpg';
          const outputPath = path.join(
            __dirname,
            '../uploads',
            fileName
          );

          await sharp(req.file.buffer)
            .resize(1920, 1080)
            .jpeg({
              quality: 80,
            })
            .toFile(outputPath);

          bannerImg = `/uploads/${fileName}`;
        } else if (img && typeof img === 'string') {
          // Handle base64 image from frontend
          const base64Data = img.split(',')[1] || img;
          const buffer = Buffer.from(base64Data, 'base64');

          const fileName = Date.now() + '.jpg';
          const outputPath = path.join(
            __dirname,
            '../uploads',
            fileName
          );

          await sharp(buffer)
            .resize(1920, 1080)
            .jpeg({
              quality: 80,
            })
            .toFile(outputPath);

          bannerImg = `/uploads/${fileName}`;
        }

        await db.query(
          `INSERT INTO home_banners 
          (id, title, \`desc\`, img) 
          VALUES (?, ?, ?, ?)`,
          [id, title, desc, bannerImg]
        );

        return res.json({
          success: true,
          message: 'Thêm banner thành công',
          img: bannerImg
        });

      }
      /**
       * 112 = UPDATE
       */
      if (idFun == 112) {
        let bannerImg = img || '';

        // Handle image upload
        if (req.file) {
          const fileName = Date.now() + '.jpg';
          const outputPath = path.join(
            __dirname,
            '../uploads',
            fileName
          );

          await sharp(req.file.buffer)
            .resize(1920, 1080)
            .jpeg({
              quality: 80,
            })
            .toFile(outputPath);

          bannerImg = `/uploads/${fileName}`;
        } else if (img && typeof img === 'string' && img.startsWith('data:')) {
          // Handle base64 image from frontend
          const base64Data = img.split(',')[1] || img;
          const buffer = Buffer.from(base64Data, 'base64');

          const fileName = Date.now() + '.jpg';
          const outputPath = path.join(
            __dirname,
            '../uploads',
            fileName
          );

          await sharp(buffer)
            .resize(1920, 1080)
            .jpeg({
              quality: 80,
            })
            .toFile(outputPath);

          bannerImg = `/uploads/${fileName}`;
        }

        await db.query(
          `UPDATE home_banners 
           SET title = ?, 
               \`desc\` = ?, 
               img = ?
           WHERE id = ?`,
          [title, desc, bannerImg, id]
        );

        return res.json({
          success: true,
          message: 'Sửa banner thành công',
          img: bannerImg
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

  }
];
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