import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export const DatabaseConection = async () => {
  try {
    await prisma.$connect();
    console.log("Conexão ao banco realizada com sucesso");
  } catch (error) {
    console.error("Não foi possível conectar ao banco:", error);
  }
};
