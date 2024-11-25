import "reflect-metadata";
import "dotenv/config";
import cors from "cors";
import express from "express";
import "express-async-errors";

import routes from "./routes";

import "../../container";
import errorHandling from "./middleware/errorHandling";
import { resolve } from "path";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/files", express.static(resolve(process.env?.DISK_PATH || "tmp")));

app.use(routes);
app.use(errorHandling);

app.get("/", (req, res) => {
  res.send("API Produtos - Leonardo Totti");
});

export default app;
