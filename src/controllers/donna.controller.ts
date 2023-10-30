import { RequestHandler } from "express";


export const getDonna: RequestHandler = async (req, res) => {
  try {
    return res.status(200).json({ message: "Te amo" });
  } catch (error) {
    return res.status(500).json({ message: "ha ocurrido un error" });
  }
};
