import { Request, Response } from "express";
import { prisma } from "../../data/postgress";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { TodoRepository } from "../../domain/repositories/todo.repository";

export class TodosController {
  constructor(private readonly todoRepository: TodoRepository) {}

  public getTodos = async (req: Request, res: Response) => {
    const todos = await this.todoRepository.getAll();

    return res.json(todos);
  };

  public getTodoById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    try {
      const todo = this.todoRepository.getById(id);
      return res.json(todo);
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  };

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);

    if (error) return res.status(400).json({ message: error });

    const todo = await this.todoRepository.create(createTodoDto!);

    return res.status(201).json({ data: todo, message: "todo created success" });
  };

  public updateTodoById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const [error, updatedTodoDto] = UpdateTodoDto.create({ ...req.body, id });

    if (error) return res.status(400).json({ message: error });

    const updatedTodo = await this.todoRepository.updateById(updatedTodoDto!);

    return res.json({ data: updatedTodo, message: "update success" });
  };

  public removeTodoById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const deletedTodo = await this.todoRepository.deleteById(id);

    return res.json({ data: deletedTodo, message: "remove success" });
  };
}
