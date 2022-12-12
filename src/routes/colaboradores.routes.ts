import { Router } from "express";
import {
  getColaboradores,
  getColaboradoresCount,
  saveColaborador,
  getColaborador,
  deleteColaborador,
  updateColaborador,
} from "../controllers/colaboradores.controller";

const router = Router();

router.get("/colaboradores", getColaboradores);

router.get("/colaboradores/count", getColaboradoresCount);

router.post("/colaboradores", saveColaborador);

router.get("/colaboradores/:id", getColaborador);

router.delete("/colaboradores/:id", deleteColaborador);

router.put("/colaboradores/:id", updateColaborador);

export default router;
