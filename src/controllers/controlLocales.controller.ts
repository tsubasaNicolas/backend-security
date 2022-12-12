import { RequestHandler } from "express";
import { RowDataPacket, OkPacket } from "mysql2";

import { pool } from "../db";

export const getRegistrosControlLocales: RequestHandler = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT controlcierre.*, locales.local FROM controlcierre INNER JOIN locales ON controlcierre.id_local = locales.id ORDER BY controlcierre.fecha_hora DESC"
    );
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const getRegistrosEstadoLocales: RequestHandler = async (req, res) => {
  try {
    const [rows] = await pool.query(
      //"SELECT T1.id_local, t1.id_local, t1.estado, date_format(t1.fecha_hora, '%d-%m-%Y %H:%i') as fecha_hora, locales.local, locales.encargado FROM controlcierre T1 INNER JOIN ( SELECT id_local, MAX(id) max_id_estado FROM controlcierre GROUP BY id_local ) T2 INNER JOIN locales ON T1.id_local = T2.id_local AND T1.id = T2.max_id_estado AND locales.id= t1.id_local order by t1.estado ASC, fecha_hora DESC"
      "SELECT controlcierre.id_local, controlcierre.estado, date_format(controlcierre.fecha_hora, '%d-%m-%Y %H:%i') as fecha_hora, locales.local, locales.encargado FROM controlcierre INNER JOIN ( SELECT id_local, MAX(id) max_id_estado FROM controlcierre GROUP BY id_local ) locales INNER JOIN locales ON controlcierre.id_local = locales.id_local AND controlcierre.id = locales.max_id_estado AND locales.id= controlcierre.id_local order by controlcierre.estado ASC, fecha_hora DESC"
    );
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const getRegistroLocal: RequestHandler = async (req, res) => {
  try {
    // console.log(rows[0].id_colaborador); //console.log(rows[0].id_colaborador);
    //res.json(rows[0]);

    const { id } = req.params;
    const [rows] = <RowDataPacket[]>(
      await pool.query("SELECT * FROM controlcierre WHERE id = ?", [id])
    );
    console.log(rows);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Registro no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const getRegistrosCount: RequestHandler = async (req, res) => {
  try {
    const [rows] = await pool.execute("SELECT COUNT(*) FROM controlcierre");
    console.log(rows);
    res.json([rows]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const saveRegistroLocal: RequestHandler = async (req, res) => {
  try {
    const { id_local, cierre, estado, fecha_hora } = req.body;
    const [rows] = <RowDataPacket[]>(
      await pool.query(
        "INSERT INTO controlcierre ( id_local, cierre, estado, fecha_hora) VALUES (?, ?, ?, ?)",
        [id_local, cierre, estado, fecha_hora]
      )
    );
    res
      .status(201)
      .json({ id: rows.insertId, id_local, cierre, estado, fecha_hora });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const deleteRegistroLocal: RequestHandler = async (req, res) => {
  try {
    await pool.execute("delete from controlcierre where id = ?", [
      req.params.id,
    ]);
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const updateRegistroLocal: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_local, cierre, estado, fecha_hora } = req.body;

    const [result] = <RowDataPacket[]>(
      await pool.query(
        "UPDATE controlcierre SET id_local = IFNULL(?, id_local), cierre = IFNULL(?, cierre), estado = IFNULL(?, estado), fecha_hora = IFNULL(?, fecha_hora)  WHERE id = ?",
        [id_local, cierre, estado, fecha_hora, id]
      )
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Registro not found" });

    const [rows] = <RowDataPacket[]>(
      await pool.query("SELECT * FROM controlcierre WHERE id = ?", [id])
    );

    res.json(rows[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};
