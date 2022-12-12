import { RequestHandler } from "express";
import { RowDataPacket, OkPacket } from "mysql2";

import { pool } from "../db";

export const getColaboradores: RequestHandler = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM colaboradores");
    res.json(rows);
  } catch (error) {
    console.log(error);
  }
};

export const getColaborador: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = <RowDataPacket[]>(
      await pool.query("SELECT * FROM colaboradores WHERE id = ?", [id])
    );
    console.log(rows);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Colaborador no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const getColaboradoresCount: RequestHandler = async (req, res) => {
  try {
    const [rows] = await pool.execute("SELECT COUNT(*) FROM colaboradores");
    console.log(rows);
    res.json([rows]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const saveColaborador: RequestHandler = async (req, res) => {
  try {
    const { nombre, telefono } = req.body;
    const [rows] = <RowDataPacket[]>(
      await pool.query(
        "INSERT INTO colaboradores (nombre, telefono) VALUES (?, ?)",
        [nombre, telefono]
      )
    );
    res.status(201).json({ id: rows.insertId, nombre, telefono });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const deleteColaborador: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = <RowDataPacket[]>(
      await pool.query("DELETE FROM colaboradores WHERE id = ?", [id])
    );

    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: "Colaborador no encontrado" });
    }

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Ha ocurrido un error" });
  }
};

export const updateColaborador: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, telefono } = req.body;

    const [result] = <RowDataPacket[]>(
      await pool.query(
        "UPDATE colaboradores SET nombre = IFNULL(?, nombre), telefono = IFNULL(?, telefono) WHERE id = ?",
        [nombre, telefono, id]
      )
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Colaborador not found" });

    const [rows] = <RowDataPacket[]>(
      await pool.query("SELECT * FROM colaboradores WHERE id = ?", [id])
    );

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};
