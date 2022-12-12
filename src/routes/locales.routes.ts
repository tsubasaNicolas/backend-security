import { Router } from "express";
import {
  getLocales,
  getLocalesCount,
  saveLocal,
  getLocal,
  deleteLocal,
  updateLocal,
} from "../controllers/locales.controller";

const router = Router();

router.get("/locales", getLocales);

router.get("/locales/count", getLocalesCount);

router.post("/locales", saveLocal);

router.get("/locales/:id", getLocal);

router.delete("/locales/:id", deleteLocal);

router.put("/locales/:id", updateLocal);

export default router;
