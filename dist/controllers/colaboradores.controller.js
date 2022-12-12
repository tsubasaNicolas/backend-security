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
exports.updateColaborador = exports.deleteColaborador = exports.saveColaborador = exports.getColaboradoresCount = exports.getColaborador = exports.getColaboradores = void 0;
const db_1 = require("../db");
const getColaboradores = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield db_1.pool.query("SELECT * FROM colaboradores");
        res.json(rows);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getColaboradores = getColaboradores;
const getColaborador = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const [rows] = (yield db_1.pool.query("SELECT * FROM colaboradores WHERE id = ?", [id]));
        console.log(rows);
        if (rows.length <= 0) {
            return res.status(404).json({ message: "Colaborador no encontrado" });
        }
        res.json(rows[0]);
    }
    catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
});
exports.getColaborador = getColaborador;
const getColaboradoresCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield db_1.pool.execute("SELECT COUNT(*) FROM colaboradores");
        console.log(rows);
        res.json([rows]);
    }
    catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
});
exports.getColaboradoresCount = getColaboradoresCount;
const saveColaborador = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, telefono } = req.body;
        const [rows] = (yield db_1.pool.query("INSERT INTO colaboradores (nombre, telefono) VALUES (?, ?)", [nombre, telefono]));
        res.status(201).json({ id: rows.insertId, nombre, telefono });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something goes wrong" });
    }
});
exports.saveColaborador = saveColaborador;
const deleteColaborador = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const [rows] = (yield db_1.pool.query("DELETE FROM colaboradores WHERE id = ?", [id]));
        if (rows.affectedRows <= 0) {
            return res.status(404).json({ message: "Colaborador no encontrado" });
        }
        res.sendStatus(204);
    }
    catch (error) {
        return res.status(500).json({ message: "Ha ocurrido un error" });
    }
});
exports.deleteColaborador = deleteColaborador;
const updateColaborador = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { nombre, telefono } = req.body;
        const [result] = (yield db_1.pool.query("UPDATE colaboradores SET nombre = IFNULL(?, nombre), telefono = IFNULL(?, telefono) WHERE id = ?", [nombre, telefono, id]));
        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Colaborador not found" });
        const [rows] = (yield db_1.pool.query("SELECT * FROM colaboradores WHERE id = ?", [id]));
        res.json(rows[0]);
    }
    catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
});
exports.updateColaborador = updateColaborador;
