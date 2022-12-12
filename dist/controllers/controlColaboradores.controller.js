"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRegistroColaborador = exports.deleteRegistroColaborador = exports.saveRegistroColaborador = exports.getRegistrosCount = exports.getUltimoRegistroColaborador = exports.getRegistroColaborador = exports.getRegistrosEstadoColaboradores = exports.getRegistrosControlColaboradores = void 0;
const db_1 = require("../db");
const getRegistrosControlColaboradores = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield db_1.pool.query("SELECT controlingreso.*, colaboradores.nombre FROM controlingreso INNER JOIN colaboradores ON controlingreso.id_colaborador = colaboradores.id ORDER BY controlingreso.fecha_hora DESC");
        res.json(rows);
    }
    catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
});
exports.getRegistrosControlColaboradores = getRegistrosControlColaboradores;
const getRegistrosEstadoColaboradores = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield db_1.pool.query(
        // "SELECT T1.id_colaborador, t1.id_colaborador, t1.estado, date_format(t1.fecha_hora, '%d-%m-%Y %H:%i') as fecha_hora, colaboradores.nombre FROM controlingreso T1 INNER JOIN ( SELECT id_colaborador, MAX(id) max_id_estado FROM controlingreso GROUP BY id_colaborador ) T2  INNER JOIN colaboradores ON T1.id_colaborador = T2.id_colaborador AND T1.id = T2.max_id_estado  AND colaboradores.id= t1.id_colaborador order by estado ASC, fecha_hora DESC"
        "SELECT controlingreso.id_colaborador, controlingreso.estado, date_format(controlingreso.fecha_hora, '%d-%m-%Y %H:%i') as fecha_hora, colaboradores.nombre FROM controlingreso INNER JOIN ( SELECT id_colaborador, MAX(id) max_id_estado FROM controlingreso GROUP BY id_colaborador ) colaboradores INNER JOIN colaboradores ON controlingreso.id_colaborador = colaboradores.id_colaborador AND controlingreso.id = colaboradores.max_id_estado AND colaboradores.id= controlingreso.id_colaborador order by estado ASC, fecha_hora DESC");
        res.json(rows);
    }
    catch (error) {
        console.log(error);
        return res.status(404).json({ message: "Registro no encontrado" });
    }
});
exports.getRegistrosEstadoColaboradores = getRegistrosEstadoColaboradores;
const getRegistroColaborador = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log(rows[0].id_colaborador); //console.log(rows[0].id_colaborador);
        //res.json(rows[0]);
        const { id } = req.params;
        const [rows] = (yield db_1.pool.query("SELECT * FROM controlingreso WHERE id = ?", [id]));
        console.log(rows);
        if (rows.length <= 0) {
            return res.status(404).json({ message: "Registro no encontrado" });
        }
        res.json(rows[0]);
    }
    catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
});
exports.getRegistroColaborador = getRegistroColaborador;
const getUltimoRegistroColaborador = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield db_1.pool.query("SELECT * FROM controlingreso where id_colaborador = ?  ORDER BY id DESC LIMIT 1", [req.params.id]);
        console.log(rows);
        res.json(rows);
    }
    catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
});
exports.getUltimoRegistroColaborador = getUltimoRegistroColaborador;
const getRegistrosCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield db_1.pool.execute("SELECT COUNT(*) FROM controlingreso");
        console.log(rows);
        res.json([rows]);
    }
    catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
});
exports.getRegistrosCount = getRegistrosCount;
const saveRegistroColaborador = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_colaborador, ingreso, estado, fecha_hora } = req.body;
        const [rows] = (yield db_1.pool.query("INSERT INTO controlingreso (id_colaborador, ingreso, estado, fecha_hora) VALUES (?, ?, ?, ?)", [id_colaborador, ingreso, estado, fecha_hora]));
        res
            .status(201)
            .json({ id: rows.insertId, id_colaborador, ingreso, estado, fecha_hora });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something goes wrong" });
    }
});
exports.saveRegistroColaborador = saveRegistroColaborador;
const deleteRegistroColaborador = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.pool.execute("delete from controlingreso where id = ?", [
            req.params.id,
        ]);
        res.sendStatus(204);
    }
    catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
});
exports.deleteRegistroColaborador = deleteRegistroColaborador;
const updateRegistroColaborador = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { id_colaborador, ingreso, estado, fecha_hora } = req.body;
        const [result] = (yield db_1.pool.query("UPDATE controlingreso SET id_colaborador = IFNULL(?, id_colaborador), ingreso = IFNULL(?, ingreso), estado = IFNULL(?, estado), fecha_hora = IFNULL(?, fecha_hora)  WHERE id = ?", [id_colaborador, ingreso, estado, fecha_hora, id]));
        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Registro not found" });
        const [rows] = (yield db_1.pool.query("SELECT * FROM controlingreso WHERE id = ?", [id]));
        res.json(rows[0]);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something goes wrong" });
    }
});
exports.updateRegistroColaborador = updateRegistroColaborador;
