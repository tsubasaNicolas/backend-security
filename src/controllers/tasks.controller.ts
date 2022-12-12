import { RequestHandler } from "express";

import { pool } from "../db";
import { RowDataPacket } from "mysql2";

export const getTasks: RequestHandler = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM tasks ORDER BY createAt ASC"
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: "ha ocurrido un error" });
  }
};

export const getTask: RequestHandler = async (req, res) => {
  try {
    const [result] = <RowDataPacket[]>(
      await pool.query("SELECT * FROM tasks WHERE id = ?", [req.params.id])
    );

    if (result.length === 0)
      return res.status(404).json({ message: "Task not found" });

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: "Ha ocurrido un error" });
  }
};

export const createTask: RequestHandler = async (req, res) => {
  try {
    const { title, description } = req.body;
    const [result] = <RowDataPacket[]>(
      await pool.query("INSERT INTO tasks(title, description) VALUES (?, ?)", [
        title,
        description,
      ])
    );
    res.json({
      id: result.insertId,
      title,
      description,
    });
  } catch (error) {
    return res.status(500).json({ message: "Ha ocurrido un error" });
  }
};

export const updateTask: RequestHandler = async (req, res) => {
  try {
    const result = await pool.query("UPDATE tasks SET ? WHERE id = ?", [
      req.body,
      req.params.id,
    ]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: "Ha ocurrido un error" });
  }
};

export const deleteTask: RequestHandler = async (req, res) => {
  try {
    const [result] = <RowDataPacket[]>(
      await pool.query("DELETE FROM tasks WHERE id = ?", [req.params.id])
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Task not found" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Ha ocurrido un error" });
  }
};
