"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_PORT = exports.DB_DATABASE = exports.DB_PASSWORD = exports.DB_USER = exports.DB_HOST = exports.PORT = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
/* export const PORT = process.env.PORT || 3000;
export const DB_HOST = process.env.DB_HOST || "31.170.166.145";
export const DB_USER = process.env.DB_USER || "u524788796_security";
export const DB_PASSWORD = process.env.DB_PASSWORD || "Seguridad2021";
export const DB_DATABASE = process.env.DB_DATABASE || "u524788796_security"; */
exports.PORT = process.env.PORT || 3000;
exports.DB_HOST = process.env.DB_HOST || "containers-us-west-155.railway.app";
exports.DB_USER = process.env.DB_USER || "root";
exports.DB_PASSWORD = process.env.DB_PASSWORD || "4vkPnT7FJa6Mpd4nLeeJ$1";
exports.DB_DATABASE = process.env.DB_DATABASE || "railway";
exports.DB_PORT = process.env.DB_PORT || 7555;
/* export const PORT = process.env.PORT || 3000;
export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_USER = process.env.DB_USER || "nicolas";
export const DB_PASSWORD = process.env.DB_PASSWORD || "pedro2022$1";
export const DB_DATABASE = process.env.DB_DATABASE || "security";
export const DB_PORT = process.env.DB_PORT || 3306; */
