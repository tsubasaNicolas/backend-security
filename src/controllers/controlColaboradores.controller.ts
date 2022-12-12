import { RequestHandler } from "express";
import { RowDataPacket, OkPacket } from "mysql2";

import { pool } from "../db";

export const getRegistrosControlColaboradores: RequestHandler = async (
  req,
  res
) => {
  try {
    const [rows] = await pool.query(
      "SELECT controlingreso.*, colaboradores.nombre FROM controlingreso INNER JOIN colaboradores ON controlingreso.id_colaborador = colaboradores.id ORDER BY controlingreso.fecha_hora DESC"
    );
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const getRegistrosEstadoColaboradores: RequestHandler = async (
  req,
  res
) => {
  try {
    const [rows] = await pool.query(
      // "SELECT T1.id_colaborador, t1.id_colaborador, t1.estado, date_format(t1.fecha_hora, '%d-%m-%Y %H:%i') as fecha_hora, colaboradores.nombre FROM controlingreso T1 INNER JOIN ( SELECT id_colaborador, MAX(id) max_id_estado FROM controlingreso GROUP BY id_colaborador ) T2  INNER JOIN colaboradores ON T1.id_colaborador = T2.id_colaborador AND T1.id = T2.max_id_estado  AND colaboradores.id= t1.id_colaborador order by estado ASC, fecha_hora DESC"
      "SELECT controlingreso.id_colaborador, controlingreso.estado, date_format(controlingreso.fecha_hora, '%d-%m-%Y %H:%i') as fecha_hora, colaboradores.nombre FROM controlingreso INNER JOIN ( SELECT id_colaborador, MAX(id) max_id_estado FROM controlingreso GROUP BY id_colaborador ) colaboradores INNER JOIN colaboradores ON controlingreso.id_colaborador = colaboradores.id_colaborador AND controlingreso.id = colaboradores.max_id_estado AND colaboradores.id= controlingreso.id_colaborador order by estado ASC, fecha_hora DESC"
    );
    res.json(rows);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Registro no encontrado" });
  }
};

export const getRegistroColaborador: RequestHandler = async (req, res) => {
  try {
    // console.log(rows[0].id_colaborador); //console.log(rows[0].id_colaborador);
    //res.json(rows[0]);

    const { id } = req.params;
    const [rows] = <RowDataPacket[]>(
      await pool.query("SELECT * FROM controlingreso WHERE id = ?", [id])
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

export const getUltimoRegistroColaborador: RequestHandler = async (
  req,
  res
) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM controlingreso where id_colaborador = ?  ORDER BY id DESC LIMIT 1",
      [req.params.id]
    );
    console.log(rows);
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const getRegistrosCount: RequestHandler = async (req, res) => {
  try {
    const [rows] = await pool.execute("SELECT COUNT(*) FROM controlingreso");
    console.log(rows);
    res.json([rows]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const saveRegistroColaborador: RequestHandler = async (req, res) => {
  try {
    const { id_colaborador, ingreso, estado, fecha_hora } = req.body;
    const [rows] = <RowDataPacket[]>(
      await pool.query(
        "INSERT INTO controlingreso (id_colaborador, ingreso, estado, fecha_hora) VALUES (?, ?, ?, ?)",
        [id_colaborador, ingreso, estado, fecha_hora]
      )
    );
    res
      .status(201)
      .json({ id: rows.insertId, id_colaborador, ingreso, estado, fecha_hora });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};
export const deleteRegistroColaborador: RequestHandler = async (req, res) => {
  try {
    await pool.execute("delete from controlingreso where id = ?", [
      req.params.id,
    ]);
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const updateRegistroColaborador: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_colaborador, ingreso, estado, fecha_hora } = req.body;

    const [result] = <RowDataPacket[]>(
      await pool.query(
        "UPDATE controlingreso SET id_colaborador = IFNULL(?, id_colaborador), ingreso = IFNULL(?, ingreso), estado = IFNULL(?, estado), fecha_hora = IFNULL(?, fecha_hora)  WHERE id = ?",
        [id_colaborador, ingreso, estado, fecha_hora, id]
      )
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Registro not found" });

    const [rows] = <RowDataPacket[]>(
      await pool.query("SELECT * FROM controlingreso WHERE id = ?", [id])
    );

    res.json(rows[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};
