import express from "express";
import cors from "cors";
import dotenv from 'dotenv';

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

const PORT = 5432;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})