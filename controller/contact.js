// controllers/contactController.js
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
 */

exports.contactController = async (req, res) => {
  try {
    const {
      idFun,
      id,
      name,
      phone,
      service,
      note,
      contact_date,
      status,
    } = req.body;

    /**
     * 111 = ADD
     */
    if (idFun == 111) {
      const [result] = await db.query(
        `
        INSERT INTO contacts
        (
          name,
          phone,
          service,
          note,
          contact_date,
          status
        )
        VALUES (?, ?, ?, ?, ?, ?)
      `,
        [
          name,
          phone,
          service,
          note,
          contact_date,
          status || "new",
        ]
      );

      return res.status(200).json({
        success: true,
        message: "Add contact success",
        insertId: result.insertId,
      });
    }

    /**
     * 112 = UPDATE
     */
    if (idFun == 112) {
      await db.query(
        `
        UPDATE contacts
        SET
          name = ?,
          phone = ?,
          service = ?,
          note = ?,
          contact_date = ?,
          status = ?
        WHERE id = ?
      `,
        [name, phone, service, note, contact_date, status, id]
      );

      return res.status(200).json({
        success: true,
        message: "Update contact success",
      });
    }

    /**
     * 113 = DELETE
     */
    if (idFun == 113) {
      await db.query(
        `
        DELETE FROM contacts
        WHERE id = ?
      `,
        [id]
      );

      return res.status(200).json({
        success: true,
        message: "Delete contact success",
      });
    }

    /**
     * 114 = GET ALL
     */
    if (idFun == 114) {
      const [rows] = await db.query(`
        SELECT *
        FROM contacts
        ORDER BY id DESC
      `);

      return res.status(200).json({
        success: true,
        total: rows.length,
        data: rows,
      });
    }

    /**
     * INVALID idFun
     */
    return res.status(400).json({
      success: false,
      message: "Invalid idFun",
    });
  } catch (error) {
    console.error("CONTACT CONTROLLER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};