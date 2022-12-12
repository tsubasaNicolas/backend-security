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
exports.deleteTask = exports.updateTask = exports.createTask = exports.getTask = exports.getTasks = void 0;
const db_1 = require("../db");
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [result] = yield db_1.pool.query("SELECT * FROM tasks ORDER BY createAt ASC");
        res.json(result);
    }
    catch (error) {
        return res.status(500).json({ message: "ha ocurrido un error" });
    }
});
exports.getTasks = getTasks;
const getTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [result] = (yield db_1.pool.query("SELECT * FROM tasks WHERE id = ?", [req.params.id]));
        if (result.length === 0)
            return res.status(404).json({ message: "Task not found" });
        res.json(result[0]);
    }
    catch (error) {
        return res.status(500).json({ message: "Ha ocurrido un error" });
    }
});
exports.getTask = getTask;
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = req.body;
        const [result] = (yield db_1.pool.query("INSERT INTO tasks(title, description) VALUES (?, ?)", [
            title,
            description,
        ]));
        res.json({
            id: result.insertId,
            title,
            description,
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Ha ocurrido un error" });
    }
});
exports.createTask = createTask;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_1.pool.query("UPDATE tasks SET ? WHERE id = ?", [
            req.body,
            req.params.id,
        ]);
        res.json(result);
    }
    catch (error) {
        return res.status(500).json({ message: "Ha ocurrido un error" });
    }
});
exports.updateTask = updateTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [result] = (yield db_1.pool.query("DELETE FROM tasks WHERE id = ?", [req.params.id]));
        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Task not found" });
        return res.sendStatus(204);
    }
    catch (error) {
        return res.status(500).json({ message: "Ha ocurrido un error" });
    }
});
exports.deleteTask = deleteTask;
