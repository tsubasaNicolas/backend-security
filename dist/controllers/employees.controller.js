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
exports.updateEmployee = exports.createEmployee = exports.deleteEmployee = exports.getEmployee = exports.getEmployees = void 0;
const db_1 = require("../db");
/*interface RowMysql extends RowDataPacket {
  id: number;
  name: string;
  salary: number;
}*/
const getEmployees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield db_1.pool.query("SELECT * FROM employee");
        res.json(rows);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something goes wrong" });
    }
});
exports.getEmployees = getEmployees;
const getEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const [rows] = (yield db_1.pool.query("SELECT * FROM employee WHERE id = ?", [id]));
        console.log(rows);
        if (rows.length <= 0) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.json(rows[0]);
    }
    catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
});
exports.getEmployee = getEmployee;
const deleteEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const [rows] = (yield db_1.pool.query("DELETE FROM employee WHERE id = ?", [id]));
        if (rows.affectedRows <= 0) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.sendStatus(204);
    }
    catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
});
exports.deleteEmployee = deleteEmployee;
const createEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, salary } = req.body;
        const [rows] = (yield db_1.pool.query("INSERT INTO employee (name, salary) VALUES (?, ?)", [
            name,
            salary,
        ]));
        res.status(201).json({ id: rows.insertId, name, salary });
    }
    catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
});
exports.createEmployee = createEmployee;
const updateEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, salary } = req.body;
        const [result] = (yield db_1.pool.query("UPDATE employee SET name = IFNULL(?, name), salary = IFNULL(?, salary) WHERE id = ?", [name, salary, id]));
        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Employee not found" });
        const [rows] = (yield db_1.pool.query("SELECT * FROM employee WHERE id = ?", [id]));
        res.json(rows[0]);
    }
    catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
});
exports.updateEmployee = updateEmployee;
