import "reflect-metadata";
import "dotenv/config";
import cors from "cors";
import express from "express";
import "express-async-errors";

import routes from "./routes";

import "../../container";
import errorHandling from "./middleware/errorHandling";

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);
app.use(errorHandling);

app.get("/", (req, res) => {
  res.send("API Produtos - Leonardo Totti");
});

export default app;
