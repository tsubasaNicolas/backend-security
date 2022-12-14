import { createPool } from "mysql2/promise";
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_USER, DB_PORT } from "./config";

export const pool = createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  // port: 7555,
  port: DB_PORT,
  database: DB_DATABASE,
});
