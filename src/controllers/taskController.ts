import { Request, Response } from "express";
import { prisma } from "../config/database";

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, status, userId } = req.body;

    const task = await prisma.task.create({
      data: {
        title,
        description,
        status,
        user: {
          connect: { id: Number(userId) }, 
        },
      },
    });

    res.status(201).json(task);
  } catch (error: any) {
    res.status(500).json({ message: "Erro ao criar tarefa", error: error.message });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await prisma.task.findMany({
      include: { user: true }, 
    });
    res.json(tasks);
  } catch (error: any) {
    res.status(500).json({ message: "Erro ao buscar tarefas", error: error.message });
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const task = await prisma.task.findUnique({
      where: { id: Number(id) },
      include: { user: true },
    });

    if (!task) return res.status(404).json({ message: "Tarefa não encontrada" });
    res.json(task);
  } catch (error: any) {
    res.status(500).json({ message: "Erro ao buscar tarefa", error: error.message });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, status, userId } = req.body;

    const task = await prisma.task.update({
      where: { id: Number(id) },
      data: {
        title,
        description,
        status,
        user: userId ? { connect: { id: Number(userId) } } : undefined,
      },
    });

    res.json({ message: "Tarefa atualizada com sucesso", task });
  } catch (error: any) {
    res.status(500).json({ message: "Erro ao atualizar tarefa", error: error.message });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.task.delete({
      where: { id: Number(id) }, 
    });

    res.json({ message: "Tarefa deletada com sucesso" });
  } catch (error: any) {
    res.status(500).json({ message: "Erro ao deletar tarefa", error: error.message });
  }
};
