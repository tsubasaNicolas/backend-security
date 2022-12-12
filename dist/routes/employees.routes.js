"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employees_controller_1 = require("../controllers/employees.controller");
const router = (0, express_1.Router)();
router.get("/employees", employees_controller_1.getEmployees);
// GET An Employee
router.get("/employees/:id", employees_controller_1.getEmployee);
// DELETE An Employee
router.delete("/employees/:id", employees_controller_1.deleteEmployee);
// INSERT An Employee
router.post("/employees", employees_controller_1.createEmployee);
router.patch("/employees/:id", employees_controller_1.updateEmployee);
exports.default = router;
