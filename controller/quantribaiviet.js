const express = require('express');
const db = require('../connectDB')
const app = express();

app.use(express.json());

/**
 * idFun
 * 111 = ADD
 * 112 = UPDATE
 * 113 = DELETE
 * 114 = GET ALL
 * 115 = GET DETAIL
 */

exports.articleController = async (req, res) => {
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

      thumbnail,
      views,
      status,
      publish_date,
      slug,
    } = req.body;

    /**
     * 111 = ADD
     */
    if (idFun == 111) {
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
          views || 0,
          status || "draft",
          publish_date,
          slug,
        ]
      );

      return res.status(200).json({
        success: true,
        message: "Add article success",
        insertId: result.insertId,
      });
    }

    /**
     * 112 = UPDATE
     */
    if (idFun == 112) {
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
        message: "Update article success",
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
        message: "Delete article success",
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

      // filter cate with mapping
      if (cate) {
        // map frontend page keys to stored cate values
        let filterCate = cate;
        if (cate === 'page_services') filterCate = 'service';
        else if (cate === 'page_about') filterCate = 'home';
        else if (cate === 'page_training') filterCate = 'training';

        console.log("Filtering by cate:", cate, "->", filterCate);
        sql += ` WHERE cate = ?`;
        params.push(filterCate);
      }

      sql += ` ORDER BY id DESC`;

      const [rows] = await db.query(sql, params);

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
          message: "Article not found",
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
    console.error("ARTICLE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};