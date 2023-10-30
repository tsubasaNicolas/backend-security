"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const donna_controller_1 = require("../controllers/donna.controller");
const router = (0, express_1.Router)();
router.get("/donna", donna_controller_1.getDonna);
/* router.get("/tasks/:id", getTask);

router.post("/tasks", createTask);

router.put("/tasks/:id", updateTask);

router.delete("/tasks/:id", deleteTask); */
exports.default = router;
