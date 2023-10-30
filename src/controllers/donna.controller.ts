import { RequestHandler } from "express";


export const getDonna: RequestHandler = async (req, res) => {
  return res.status(200).send("Te amo");
};