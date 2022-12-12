"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controlLocales_controller_1 = require("../controllers/controlLocales.controller");
const router = (0, express_1.Router)();
router.get("/cierre", controlLocales_controller_1.getRegistrosControlLocales);
router.get("/cierre/count", controlLocales_controller_1.getRegistrosCount);
// ruta ingreso agrupado
router.get("/cierre/locales", controlLocales_controller_1.getRegistrosEstadoLocales);
router.post("/cierre", controlLocales_controller_1.saveRegistroLocal);
router.get("/cierre/:id", controlLocales_controller_1.getRegistroLocal);
router.delete("/cierre/:id", controlLocales_controller_1.deleteRegistroLocal);
router.put("/cierre/:id", controlLocales_controller_1.updateRegistroLocal);
exports.default = router;
