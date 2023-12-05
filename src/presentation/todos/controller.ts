import { Request, Response } from "express";

const todos = [
  { id: 1, text: "Buy milk", createdAt: new Date() },
  { id: 2, text: "Buy Bread", createdAt: new Date() },
  { id: 3, text: "Buy Butter", createdAt: new Date() },
];

export class TodosController {
  private todos = [
    { id: 1, text: "Buy milk", createdAt: new Date() },
    { id: 2, text: "Buy Bread", createdAt: new Date() },
    { id: 3, text: "Buy Butter", createdAt: new Date() },
  ];

  public static getTodos(req: Request, res: Response) {
    return res.json(todos);
  }

  public static getTodoById(req: Request, res: Response) {
    const { id } = req.params;

    if (!isFinite(Number(id))) return res.status(400).json({ message: "id is not a number" });

    const todo = todos.find((todo) => todo.id === Number(id));

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
      createdAt: new Date(),
    };

    todos.push(newTodo);

    return res.status(201).json({ message: "todo created success" });
  }
}
