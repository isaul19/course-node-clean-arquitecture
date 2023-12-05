import { Router } from "express";
import { TodosController } from "./controller";

export class TodosRoutes {
  static get routes(): Router {
    const router = Router();

    router.get("/", TodosController.getTodos);
    router.get("/:id", TodosController.getTodoById);
    router.post("/", TodosController.createTodo);

    return router;
  }
}
