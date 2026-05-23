// controllers/articleController.js

const express = require("express");
const db = require("../connectDB");

const multer = require("multer");
const sharp = require("sharp");

const path = require("path");
const fs = require("fs");

const app = express();

// body limit
app.use(express.json({ limit: "50mb" }));

app.use(
  express.urlencoded({
    limit: "50mb",
    extended: true,
  })
);

// public uploads
app.use(
  "/uploads",
  express.static("uploads")
);

// create uploads folder
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// multer memory storage
const storage = multer.memoryStorage();

const upload = multer({
  storage,

  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
});

/**
 * idFun
 * 111 = ADD
 * 112 = UPDATE
 * 113 = DELETE
 * 114 = GET ALL
 * 115 = GET DETAIL
 */

exports.articleController = [
  upload.single("thumbnail"),

  async (req, res) => {
    console.log("ARTICLE BODY:", req.body);
    try {
      const {
        idFun,

        id,
        cate,

        title_vi,
        title_en,
        title_jp,

        desc_vi,
        desc_en,
        desc_jp,

        content_vi,
        content_en,
        content_jp,

        views,
        status,
        publish_date,
        slug,
      } = req.body;

      /**
       * 111 = ADD
       */
      if (idFun == 111) {
        let thumbnail = "";

        // compress + save image
        if (req.file) {
          try {
            const fileName =
              Date.now() + ".jpg";

            const outputPath = path.join(
              __dirname,
              "../uploads",
              fileName
            );

            await sharp(req.file.buffer)
              .resize(1200)
              .jpeg({
                quality: 70,
              })
              .toFile(outputPath);

            thumbnail = `/uploads/${fileName}`;
          } catch (imageError) {
            console.error("Image processing error:", imageError.message);
            return res.status(400).json({
              success: false,
              message: `Invalid image format: ${imageError.message}. Please upload a valid JPG, PNG, WebP, or GIF image.`,
            });
          }
        } else if (req.body.thumbnail && typeof req.body.thumbnail === 'string') {
          // Handle base64 thumbnail from frontend
          try {
            const base64Data = req.body.thumbnail.split(',')[1] || req.body.thumbnail;
            const buffer = Buffer.from(base64Data, 'base64');

            const fileName =
              Date.now() + ".jpg";

            const outputPath = path.join(
              __dirname,
              "../uploads",
              fileName
            );

            await sharp(buffer)
              .resize(1200)
              .jpeg({
                quality: 70,
              })
              .toFile(outputPath);

            thumbnail = `/uploads/${fileName}`;
          } catch (imageError) {
            console.error("Base64 image processing error:", imageError.message);
            return res.status(400).json({
              success: false,
              message: `Invalid image format in base64: ${imageError.message}. Please ensure the image data is valid.`,
            });
          }
        }
let filterCate = "";

if (cate) {
    filterCate = cate;

    if (cate === "page_services")
        filterCate = "service";
    else if (cate === "page_about" || cate === "about")
        filterCate = "home";
    else if (cate === "page_training")
        filterCate = "training";
    else if (cate === "news")
        filterCate = "news";
}
        const [result] = await db.query(
          `
          INSERT INTO articles (
            cate,

            title_vi,
            title_en,
            title_jp,

            desc_vi,
            desc_en,
            desc_jp,

            content_vi,
            content_en,
            content_jp,

            thumbnail,
            views,
            status,
            publish_date,
            slug
          )
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
          [
            filterCate,

            title_vi,
            title_en,
            title_jp,

            desc_vi,
            desc_en,
            desc_jp,

            content_vi,
            content_en,
            content_jp,

            thumbnail,
            views || 0,
            status || "draft",
            publish_date,
            slug,
          ]
        );
console.log("INSERT RESULT:", filterCate);
        return res.status(200).json({
          success: true,
          message: "Add article success",
          insertId: result.insertId,
          thumbnail,
        });
      }

      /**
       * 112 = UPDATE
       */
      if (idFun == 112) {
        let thumbnail =
          req.body.thumbnail || "";

        // upload new image
        if (req.file) {
          try {
            const fileName =
              Date.now() + ".jpg";

            const outputPath = path.join(
              __dirname,
              "../uploads",
              fileName
            );

            await sharp(req.file.buffer)
              .resize(1200)
              .jpeg({
                quality: 70,
              })
              .toFile(outputPath);

            thumbnail = `/uploads/${fileName}`;
          } catch (imageError) {
            console.error("Image processing error (UPDATE):", imageError.message);
            return res.status(400).json({
              success: false,
              message: `Invalid image format: ${imageError.message}. Please upload a valid JPG, PNG, WebP, or GIF image.`,
            });
          }
        }

        await db.query(
          `
          UPDATE articles
          SET
            cate = ?,

            title_vi = ?,
            title_en = ?,
            title_jp = ?,

            desc_vi = ?,
            desc_en = ?,
            desc_jp = ?,

            content_vi = ?,
            content_en = ?,
            content_jp = ?,

            thumbnail = ?,
            views = ?,
            status = ?,
            publish_date = ?,
            slug = ?

          WHERE id = ?
        `,
          [
            cate,

            title_vi,
            title_en,
            title_jp,

            desc_vi,
            desc_en,
            desc_jp,

            content_vi,
            content_en,
            content_jp,

            thumbnail,
            views,
            status,
            publish_date,
            slug,

            id,
          ]
        );

        return res.status(200).json({
          success: true,
          message:
            "Update article success",
          thumbnail,
        });
      }

      /**
       * 113 = DELETE
       */
      if (idFun == 113) {
        await db.query(
          `
          DELETE FROM articles
          WHERE id = ?
        `,
          [id]
        );

        return res.status(200).json({
          success: true,
          message:
            "Delete article success",
        });
      }

      /**
       * 114 = GET ALL
       */
      if (idFun == 114) {
        let sql = `
          SELECT *
          FROM articles
        `;

        const params = [];

        // cate mapping
        if (cate) {
          let filterCate = cate;

          if (
            cate === "page_services"
          )
            filterCate = "service";
          else if (
            cate === "page_about" || cate ==="about"
          )
            filterCate = "home";
          else if (
            cate === "page_training"
          )
            filterCate = "training";

          sql += ` WHERE cate = ?`;

          params.push(filterCate);
        }

        sql += ` ORDER BY id DESC`;

        const [rows] = await db.query(
          sql,
          params
        );
        console.log("ARTICLES:", rows);
        return res.status(200).json({
          success: true,
          total: rows.length,
          data: rows,
        });
      }

      /**
       * 115 = GET DETAIL
       */
      if (idFun == 115) {
        const [rows] = await db.query(
          `
          SELECT *
          FROM articles
          WHERE id = ?
        `,
          [id]
        );

        if (rows.length === 0) {
          return res.status(404).json({
            success: false,
            message:
              "Article not found",
          });
        }

        return res.status(200).json({
          success: true,
          data: rows[0],
        });
      }

      return res.status(400).json({
        success: false,
        message: "Invalid idFun",
      });
    } catch (error) {
      console.error(
        "ARTICLE ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message: "Server Error",
        error: error.message,
      });
    }
  },
];