"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controlColaboradores_controller_1 = require("../controllers/controlColaboradores.controller");
const router = (0, express_1.Router)();
router.get("/controlingreso", controlColaboradores_controller_1.getRegistrosControlColaboradores);
router.get("/controlingreso/count", controlColaboradores_controller_1.getRegistrosCount);
// ruta ingreso agrupado por id_colaborador
router.get("/controlingreso/colaboradores", controlColaboradores_controller_1.getRegistrosEstadoColaboradores);
router.post("/controlingreso", controlColaboradores_controller_1.saveRegistroColaborador);
router.get("/controlingreso/:id", controlColaboradores_controller_1.getRegistroColaborador);
// último registro
router.get("/controlingreso/ultimoregistro/:id", controlColaboradores_controller_1.getUltimoRegistroColaborador);
router.delete("/controlingreso/:id", controlColaboradores_controller_1.deleteRegistroColaborador);
router.put("/controlingreso/:id", controlColaboradores_controller_1.updateRegistroColaborador);
exports.default = router;
