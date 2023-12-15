import { Request, Response } from "express";
import { TodoRepository } from "@/domain/repositories";
import { CreateTodoDto, UpdateTodoDto } from "@/domain/dtos";
import { CreateTodo, DeleteTodo, GetTodo, GetTodos, UpdateTodo } from "@/domain/use-cases";

export class TodosController {
  constructor(private readonly todoRepository: TodoRepository) {}

  public getTodos = (req: Request, res: Response) => {
    new GetTodos(this.todoRepository)
      .execute()
      .then((todos) => res.json(todos))
      .catch((err) => res.status(400).json(err));
  };

  public getTodoById = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    new GetTodo(this.todoRepository)
      .execute(id)
      .then((todo) => res.json(todo))
      .catch((err) => res.status(400).json(err));
  };

  public createTodo = (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);

    if (error) return res.status(400).json({ message: error });

    new CreateTodo(this.todoRepository)
      .execute(createTodoDto!)
      .then((todo) => res.json(todo))
      .catch((err) => res.status(400).json(err));
  };

  public updateTodoById = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const [error, updatedTodoDto] = UpdateTodoDto.create({ ...req.body, id });

    if (error) return res.status(400).json({ message: error });

    new UpdateTodo(this.todoRepository)
      .execute(updatedTodoDto!)
      .then((todo) => res.json(todo))
      .catch((err) => res.status(400).json(err));
  };

  public deleteTodoById = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    new DeleteTodo(this.todoRepository)
      .execute(id)
      .then((todo) => res.json(todo))
      .catch((err) => res.status(400).json(err));
  };
}
