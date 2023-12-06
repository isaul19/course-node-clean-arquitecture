import { Request, Response } from "express";
import { prisma } from "../../data/postgress";

export class TodosController {
  public static getTodos = async (req: Request, res: Response) => {
    const todosDb = await prisma.todo.findMany();

    return res.json(todosDb);
  };

  public static getTodoById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (!isFinite(id)) return res.status(400).json({ message: "id is not a number" });

    const todoDb = await prisma.todo.findFirst({ where: { id: id } });
    if (!todoDb) return res.status(404).json({ message: `todo with id ${id} not found` });

    return res.json(todoDb);
  };

  public static createTodo = async (req: Request, res: Response) => {
    const { text } = req.body;

    await prisma.todo.create({ data: { text: text } });

    return res.status(201).json({ message: "todo created success" });
  };

  public static updateTodoById = async (req: Request, res: Response) => {
    const { text, completedAt } = req.body;
    const id = Number(req.params.id);

    if (!isFinite(id)) return res.status(400).json({ message: "id is not a number" });

    const todoDb = await prisma.todo.findFirst({ where: { id: id } });
    if (!todoDb) return res.status(404).json({ message: `todo with id ${id} not found` });

    await prisma.todo.update({
      where: { id: id },
      data: {
        text: text || todoDb.text,
        completedAt: completedAt || todoDb.completedAt,
      },
    });

    return res.json({ message: "update success" });
  };

  public static removeTodoById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (!isFinite(id)) return res.status(400).json({ message: "id is not a number" });

    const todoDb = await prisma.todo.findFirst({ where: { id: id } });
    if (!todoDb) return res.status(404).json({ message: `todo with id ${id} not found` });

    await prisma.todo.delete({
      where: { id: id },
    });

    return res.json({ message: "remove success" });
  };
}
