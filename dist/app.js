"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config");
const employees_routes_1 = __importDefault(require("./routes/employees.routes"));
const tasks_routes_1 = __importDefault(require("./routes/tasks.routes"));
const donna_routes_1 = __importDefault(require("./routes/donna.routes"));
const colaboradores_routes_1 = __importDefault(require("./routes/colaboradores.routes"));
const locales_routes_1 = __importDefault(require("./routes/locales.routes"));
const controlColaboradores_routes_1 = __importDefault(require("./routes/controlColaboradores.routes"));
const controlLocales_routes_1 = __importDefault(require("./routes/controlLocales.routes"));
const app = (0, express_1.default)();
app.set("port", config_1.PORT);
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)({
    origin: "*",
    methods: "GET,POST", // Especificar los métodos permitidos
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(tasks_routes_1.default);
app.use(employees_routes_1.default);
app.use(colaboradores_routes_1.default);
app.use(locales_routes_1.default);
app.use(controlColaboradores_routes_1.default);
app.use(controlLocales_routes_1.default);
app.use(donna_routes_1.default);
exports.default = app;
