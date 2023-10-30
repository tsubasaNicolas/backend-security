import express from "express";
import morgan from "morgan";
import cors from "cors";
import { PORT } from "./config";

import employeesRoutes from "./routes/employees.routes";
import tasksRoutes from "./routes/tasks.routes";
import donna from "./routes/donna.routes";
import colaboradoresRoutes from "./routes/colaboradores.routes";
import localesRoutes from "./routes/locales.routes";
import controlColaboradores from "./routes/controlColaboradores.routes";
import controlLocales from "./routes/controlLocales.routes";

const app = express();

app.set("port", PORT);

app.use(morgan("dev"));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(tasksRoutes);
app.use(employeesRoutes);
app.use(colaboradoresRoutes);
app.use(localesRoutes);
app.use(controlColaboradores);
app.use(controlLocales);
app.use(donna);

export default app;
