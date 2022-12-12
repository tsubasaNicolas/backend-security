import { Router } from "express";
import {
  getRegistrosControlLocales,
  getRegistrosCount,
  saveRegistroLocal,
  getRegistroLocal,
  deleteRegistroLocal,
  updateRegistroLocal,
  getRegistrosEstadoLocales,
} from "../controllers/controlLocales.controller";

const router = Router();

router.get("/cierre", getRegistrosControlLocales);

router.get("/cierre/count", getRegistrosCount);

// ruta ingreso agrupado
router.get("/cierre/locales", getRegistrosEstadoLocales);

router.post("/cierre", saveRegistroLocal);

router.get("/cierre/:id", getRegistroLocal);

router.delete("/cierre/:id", deleteRegistroLocal);

router.put("/cierre/:id", updateRegistroLocal);

export default router;
