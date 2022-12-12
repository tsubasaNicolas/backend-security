import { RequestHandler } from "express";
import { RowDataPacket } from "mysql2";

import { pool } from "../db";

export const getLocales: RequestHandler = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM locales ORDER BY estado ASC;"
    );
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const getLocal: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = <RowDataPacket[]>(
      await pool.query("SELECT * FROM locales WHERE id = ?", [id])
    );
    console.log(rows);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Local not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const getLocalesCount: RequestHandler = async (req, res) => {
  try {
    const [rows] = await pool.execute("SELECT COUNT(*) FROM locales");
    console.log(rows);
    res.json([rows]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const saveLocal: RequestHandler = async (req, res) => {
  try {
    const { local, encargado, telefono, ubicacion, estado } = req.body;
    const [rows] = <RowDataPacket[]>(
      await pool.query(
        "INSERT INTO locales (local, encargado, telefono, ubicacion, estado) VALUES (?,?,?,?,?)",
        [local, encargado, telefono, ubicacion, estado]
      )
    );
    res.status(201).json({
      id: rows.insertId,
      local,
      encargado,
      telefono,
      ubicacion,
      estado,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};
export const deleteLocal: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = <RowDataPacket[]>(
      await pool.query("DELETE FROM locales WHERE id = ?", [id])
    );

    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: "Local no encontrado" });
    }

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Ha ocurrido un error" });
  }
};

export const updateLocal: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { local, encargado, telefono, ubicacion, estado } = req.body;

    const [result] = <RowDataPacket[]>(
      await pool.query(
        "UPDATE locales SET local = IFNULL(?, local), encargado = IFNULL(?, encargado), telefono = IFNULL(?, telefono), ubicacion = IFNULL(?, ubicacion), estado = IFNULL(?, estado) WHERE id = ?",
        [local, encargado, telefono, ubicacion, estado, id]
      )
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Local not found" });

    const [rows] = <RowDataPacket[]>(
      await pool.query("SELECT * FROM locales WHERE id = ?", [id])
    );

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};
