import { Request, Response } from "express";
import { prisma } from "../../data/postgress";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";

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
    const [error, createTodoDto] = CreateTodoDto.create(req.body);

    if (error) return res.status(400).json({ message: error });

    await prisma.todo.create({ data: createTodoDto! });

    return res.status(201).json({ message: "todo created success" });
  };

  public static updateTodoById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id });

    const todoDb = await prisma.todo.findFirst({ where: { id: id } });
    if (!todoDb) return res.status(404).json({ message: `todo with id ${id} not found` });

    await prisma.todo.update({
      where: { id: id },
      data: updateTodoDto!.values,
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
