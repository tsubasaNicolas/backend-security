import { Router } from "express";
import {
  getRegistrosControlColaboradores,
  getRegistrosCount,
  saveRegistroColaborador,
  getRegistroColaborador,
  deleteRegistroColaborador,
  updateRegistroColaborador,
  getUltimoRegistroColaborador,
  getRegistrosEstadoColaboradores,
} from "../controllers/controlColaboradores.controller";

const router = Router();

router.get("/controlingreso", getRegistrosControlColaboradores);

router.get("/controlingreso/count", getRegistrosCount);

// ruta ingreso agrupado por id_colaborador
router.get("/controlingreso/colaboradores", getRegistrosEstadoColaboradores);

router.post("/controlingreso", saveRegistroColaborador);

router.get("/controlingreso/:id", getRegistroColaborador);

// último registro
router.get("/controlingreso/ultimoregistro/:id", getUltimoRegistroColaborador);

router.delete("/controlingreso/:id", deleteRegistroColaborador);

router.put("/controlingreso/:id", updateRegistroColaborador);

export default router;
