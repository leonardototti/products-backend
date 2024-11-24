import { Product } from "@modules/products/infra/typeorm/entities/Product";
import { DataSource } from "typeorm";

const mainFolder = ["production", "development"].includes(
  process.env.NODE_ENV || ""
)
  ? "dist/src"
  : "src";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.PG_HOST || "localhost",
  port: Number(process.env.PG_PORT) || 5432,
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  migrations: [`./${mainFolder}/shared/infra/typeorm/migrations/*{.ts,.js}`],
  entities: [
    `./${mainFolder}/modules/**/infra/typeorm/entities/*{.ts,.js}`,
    Product,
  ],
  synchronize: true,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

AppDataSource.initialize()
  .then(() => {
    console.log("Banco de dados conectado! ✅");
  })
  .catch(err => {
    console.error("Erro durante conexão com o banco de dados! ❌", err);
  });
