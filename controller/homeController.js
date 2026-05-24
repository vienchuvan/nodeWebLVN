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
    const payload = req.method === "POST" ? req.body : req.query;
    const idFun = payload?.idFun;
    const type = String(payload?.type || "").toLowerCase();

    const buildSidebarMenu = async () => {
      const [categories] = await db.query(`
        SELECT *
        FROM sidebar_categories
        ORDER BY id ASC
      `);

      const [items] = await db.query(`
        SELECT *
        FROM sidebar_items
        ORDER BY id ASC
      `);

      const [subItems] = await db.query(`
        SELECT *
        FROM sidebar_subitems
        ORDER BY id ASC
      `);

      return categories.map((category) => {
        const categoryItems = items
          .filter((item) => Number(item.category_id) === Number(category.id))
          .map((item) => {
            const itemSub = subItems
              .filter((sub) => Number(sub.item_id) === Number(item.id))
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
    };

    if (!idFun) {
      const data = await buildSidebarMenu();

      return res.status(200).json({
        success: true,
        data,
      });
    }

    if (Number(idFun) === 114) {
      const data = await buildSidebarMenu();

      return res.status(200).json({
        success: true,
        data,
      });
    }

    if (Number(idFun) === 111) {
      if (type === "category") {
        const category_name =
          typeof payload?.category_name === "string"
            ? payload.category_name.trim()
            : payload?.title?.trim();

        if (!category_name) {
          return res.status(400).json({
            success: false,
            message: "category_name là bắt buộc",
          });
        }

        const newId = Date.now();

        await db.query(
          `
          INSERT INTO sidebar_categories
          (id, category_name)
          VALUES (?, ?)
        `,
          [newId, category_name]
        );

        return res.status(200).json({
          success: true,
          message: "Thêm nhóm sidebar thành công",
          data: {
            id: newId,
            category_name,
          },
        });
      }

      if (type === "item") {
        const category_id = Number(payload?.category_id);
        const title = typeof payload?.title === "string" ? payload.title.trim() : "";
        const item_key = typeof payload?.item_key === "string" ? payload.item_key.trim() : "";

        if (!Number.isFinite(category_id) || !title || !item_key) {
          return res.status(400).json({
            success: false,
            message: "category_id, title và item_key là bắt buộc",
          });
        }

        const newId = Date.now();

        await db.query(
          `
          INSERT INTO sidebar_items
          (id, category_id, title, item_key)
          VALUES (?, ?, ?, ?)
        `,
          [newId, category_id, title, item_key]
        );

        return res.status(200).json({
          success: true,
          message: "Thêm mục sidebar thành công",
          data: {
            id: newId,
            category_id,
            title,
            item_key,
          },
        });
      }

      if (type === "subitem") {
        const item_id = Number(payload?.item_id);
        const title = typeof payload?.title === "string" ? payload.title.trim() : "";
        const item_key = typeof payload?.item_key === "string" ? payload.item_key.trim() : "";

        if (!Number.isFinite(item_id) || !title || !item_key) {
          return res.status(400).json({
            success: false,
            message: "item_id, title và item_key là bắt buộc",
          });
        }

        const newId = Date.now();

        await db.query(
          `
          INSERT INTO sidebar_subitems
          (id, item_id, title, item_key)
          VALUES (?, ?, ?, ?)
        `,
          [newId, item_id, title, item_key]
        );

        return res.status(200).json({
          success: true,
          message: "Thêm subitem sidebar thành công",
          data: {
            id: newId,
            item_id,
            title,
            item_key,
          },
        });
      }

      return res.status(400).json({
        success: false,
        message: "type không hợp lệ",
      });
    }

    if (Number(idFun) === 112) {
      const id = Number(payload?.id);

      if (!Number.isFinite(id)) {
        return res.status(400).json({
          success: false,
          message: "id là bắt buộc",
        });
      }

      if (type === "category") {
        const category_name =
          typeof payload?.category_name === "string"
            ? payload.category_name.trim()
            : payload?.title?.trim();

        if (!category_name) {
          return res.status(400).json({
            success: false,
            message: "category_name là bắt buộc",
          });
        }

        await db.query(
          `
          UPDATE sidebar_categories
          SET category_name = ?
          WHERE id = ?
        `,
          [category_name, id]
        );

        return res.status(200).json({
          success: true,
          message: "Cập nhật nhóm sidebar thành công",
        });
      }

      if (type === "item") {
        const category_id = Number(payload?.category_id);
        const title = typeof payload?.title === "string" ? payload.title.trim() : "";
        const item_key = typeof payload?.item_key === "string" ? payload.item_key.trim() : "";

        if (!Number.isFinite(category_id) || !title || !item_key) {
          return res.status(400).json({
            success: false,
            message: "category_id, title và item_key là bắt buộc",
          });
        }

        await db.query(
          `
          UPDATE sidebar_items
          SET category_id = ?, title = ?, item_key = ?
          WHERE id = ?
        `,
          [category_id, title, item_key, id]
        );

        return res.status(200).json({
          success: true,
          message: "Cập nhật mục sidebar thành công",
        });
      }

      if (type === "subitem") {
        const item_id = Number(payload?.item_id);
        const title = typeof payload?.title === "string" ? payload.title.trim() : "";
        const item_key = typeof payload?.item_key === "string" ? payload.item_key.trim() : "";

        if (!Number.isFinite(item_id) || !title || !item_key) {
          return res.status(400).json({
            success: false,
            message: "item_id, title và item_key là bắt buộc",
          });
        }

        await db.query(
          `
          UPDATE sidebar_subitems
          SET item_id = ?, title = ?, item_key = ?
          WHERE id = ?
        `,
          [item_id, title, item_key, id]
        );

        return res.status(200).json({
          success: true,
          message: "Cập nhật subitem sidebar thành công",
        });
      }

      return res.status(400).json({
        success: false,
        message: "type không hợp lệ",
      });
    }

    if (Number(idFun) === 113) {
      const id = Number(payload?.id);

      if (!Number.isFinite(id)) {
        return res.status(400).json({
          success: false,
          message: "id là bắt buộc",
        });
      }

      if (type === "category") {
        await db.query(
          `
          DELETE FROM sidebar_categories
          WHERE id = ?
        `,
          [id]
        );

        return res.status(200).json({
          success: true,
          message: "Xóa nhóm sidebar thành công",
        });
      }

      if (type === "item") {
        await db.query(
          `
          DELETE FROM sidebar_items
          WHERE id = ?
        `,
          [id]
        );

        return res.status(200).json({
          success: true,
          message: "Xóa mục sidebar thành công",
        });
      }

      if (type === "subitem") {
        await db.query(
          `
          DELETE FROM sidebar_subitems
          WHERE id = ?
        `,
          [id]
        );

        return res.status(200).json({
          success: true,
          message: "Xóa subitem sidebar thành công",
        });
      }

      return res.status(400).json({
        success: false,
        message: "type không hợp lệ",
      });
    }

    return res.status(400).json({
      success: false,
      message: "idFun không hợp lệ",
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