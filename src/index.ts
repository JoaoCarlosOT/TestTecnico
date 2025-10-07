import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { DatabaseConection } from "./config/database";
import Router from "./routes/routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/', Router)

const PORT = process.env.PORT || 3000;

(async () => {
  await DatabaseConection();

  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
})();
