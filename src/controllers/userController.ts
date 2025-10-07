import { Request, Response } from "express";
import { prisma } from "../config/database";
import { userSchema, userUpdateSchema } from "../schemas/userSchema";

export const createUser = async (req: Request, res: Response) => {
  try {
    const parsedData = userSchema.parse(req.body);

    const user = await prisma.user.create({
      data: parsedData,
    });

    res.status(201).json(user);
  } catch (error: any) {
    if (error.name === "Error") {
      return res.status(400).json({
        message: "Erro de validação",
        errors: error.errors,
      });
    }

    res.status(500).json({ message: "Erro ao criar usuário", error: error.message });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: "Erro ao buscar usuários", error: error.message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id: Number(id) }, 
    });
    if (!user) return res.status(404).json({ message: "Usuário não encontrado" });
    res.json(user);
  } catch (error: any) {
    res.status(500).json({ message: "Erro ao buscar usuário", error: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const parsedData = userUpdateSchema.parse(req.body); 

    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: parsedData,
    });

    res.json({ message: "Usuário atualizado com sucesso", user });
  } catch (error: any) {
    if (error.name === "Error") {
      return res.status(400).json({
        message: "Erro de validação",
        errors: error.errors,
      });
    }

    res.status(500).json({ message: "Erro ao atualizar usuário", error: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.user.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "Usuário deletado com sucesso" });
  } catch (error: any) {
    res.status(500).json({ message: "Erro ao deletar usuário", error: error.message });
  }
};
