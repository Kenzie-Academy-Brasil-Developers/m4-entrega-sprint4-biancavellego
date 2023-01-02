import express from "express";
import "reflect-metadata";
import "express-async-errors";
import handleError from "./errors/handleError";
import usersRoutes from "./routers/user.routes";
import loginRoute from "./routers/login.routes";

const app = express();
app.use(express.json());
app.use("/users", usersRoutes);
app.use("/login", loginRoute);

app.use(handleError);

export default app;
