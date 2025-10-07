import { Request, Response } from "express";
import { prisma } from "../config/database";
import { taskSchema, taskUpdateSchema } from "../schemas/taskSchema";

export const createTask = async (req: Request, res: Response) => {
  try {
    const parsedData = taskSchema.parse(req.body);

    const task = await prisma.task.create({
      data: {
        title: parsedData.title,
        description: parsedData.description,
        status: parsedData.status,
        user: { connect: { id: parsedData.userId } },
      },
    });

    res.status(201).json(task);
  } catch (error: any) {
    if (error.name === "Error") {
      return res.status(400).json({
        message: "Erro de validação",
        errors: error.errors,
      });
    }

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
    const parsedData = taskUpdateSchema.parse(req.body);

    const task = await prisma.task.update({
      where: { id: Number(id) },
      data: {
        title: parsedData.title,
        description: parsedData.description,
        status: parsedData.status,
        user: parsedData.userId
          ? { connect: { id: parsedData.userId } }
          : undefined,
      },
    });

    res.json({ message: "Tarefa atualizada com sucesso", task });
  } catch (error: any) {
    if (error.name === "Error") {
      return res.status(400).json({
        message: "Erro de validação",
        errors: error.errors,
      });
    }

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
