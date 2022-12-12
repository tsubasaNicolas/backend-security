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
exports.updateLocal = exports.deleteLocal = exports.saveLocal = exports.getLocalesCount = exports.getLocal = exports.getLocales = void 0;
const db_1 = require("../db");
const getLocales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield db_1.pool.query("SELECT * FROM locales ORDER BY estado ASC;");
        res.json(rows);
    }
    catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
});
exports.getLocales = getLocales;
const getLocal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const [rows] = (yield db_1.pool.query("SELECT * FROM locales WHERE id = ?", [id]));
        console.log(rows);
        if (rows.length <= 0) {
            return res.status(404).json({ message: "Local not found" });
        }
        res.json(rows[0]);
    }
    catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
});
exports.getLocal = getLocal;
const getLocalesCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield db_1.pool.execute("SELECT COUNT(*) FROM locales");
        console.log(rows);
        res.json([rows]);
    }
    catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
});
exports.getLocalesCount = getLocalesCount;
const saveLocal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { local, encargado, telefono, ubicacion, estado } = req.body;
        const [rows] = (yield db_1.pool.query("INSERT INTO locales (local, encargado, telefono, ubicacion, estado) VALUES (?,?,?,?,?)", [local, encargado, telefono, ubicacion, estado]));
        res.status(201).json({
            id: rows.insertId,
            local,
            encargado,
            telefono,
            ubicacion,
            estado,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something goes wrong" });
    }
});
exports.saveLocal = saveLocal;
const deleteLocal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const [rows] = (yield db_1.pool.query("DELETE FROM locales WHERE id = ?", [id]));
        if (rows.affectedRows <= 0) {
            return res.status(404).json({ message: "Local no encontrado" });
        }
        res.sendStatus(204);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Ha ocurrido un error" });
    }
});
exports.deleteLocal = deleteLocal;
const updateLocal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { local, encargado, telefono, ubicacion, estado } = req.body;
        const [result] = (yield db_1.pool.query("UPDATE locales SET local = IFNULL(?, local), encargado = IFNULL(?, encargado), telefono = IFNULL(?, telefono), ubicacion = IFNULL(?, ubicacion), estado = IFNULL(?, estado) WHERE id = ?", [local, encargado, telefono, ubicacion, estado, id]));
        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Local not found" });
        const [rows] = (yield db_1.pool.query("SELECT * FROM locales WHERE id = ?", [id]));
        res.json(rows[0]);
    }
    catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
});
exports.updateLocal = updateLocal;
