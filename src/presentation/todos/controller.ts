import { Request, Response } from "express";

interface Todo {
  id: number;
  text: string;
  completedAt: Date;
}

let todos: Todo[] = [
  { id: 1, text: "Buy milk", completedAt: new Date() },
  { id: 2, text: "Buy Bread", completedAt: new Date() },
  { id: 3, text: "Buy Butter", completedAt: new Date() },
];

export class TodosController {
  public static getTodos(req: Request, res: Response) {
    return res.json(todos);
  }

  public static getTodoById(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (!isFinite(id)) return res.status(400).json({ message: "id is not a number" });

    const todo = todos.find((todo) => todo.id === id);
    if (!todo) return res.status(404).json({ message: `todo with id ${id} not found` });

    return res.json(todo);
  }

  public static createTodo(req: Request, res: Response) {
    const { text } = req.body;

    if (!text || typeof text !== "string")
      return res.status(400).json({ message: "field 'text' is not valid string" });

    const newTodo = {
      id: todos.length + 1,
      text: text,
      completedAt: new Date(),
    };

    todos.push(newTodo);

    return res.status(201).json({ message: "todo created success" });
  }

  public static updateTodoById(req: Request, res: Response) {
    const { text } = req.body;
    const id = Number(req.params.id);

    if (!isFinite(id)) return res.status(400).json({ message: "id is not a number" });

    const todo = todos.find((todo) => todo.id === id);
    if (!todo) return res.status(404).json({ message: `todo with id ${id} not found` });

    if (!text || !text.trim())
      return res.status(400).json({ message: "field 'text' is not valid string" });

    const newTodo = {
      id: id,
      text: text,
      completedAt: new Date(),
    };

    todos = todos.map((todo) => (todo.id === id ? newTodo : todo));

    return res.json({ message: "update success" });
  }

  public static removeTodoById(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (!isFinite(id)) return res.status(400).json({ message: "id is not a number" });

    const todo = todos.find((todo) => todo.id === id);
    if (!todo) return res.status(404).json({ message: `todo with id ${id} not found` });

    todos = todos.filter((todo) => todo.id !== id);

    return res.json({ message: "remove success" });
  }
}
