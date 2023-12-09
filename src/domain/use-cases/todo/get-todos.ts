import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";

export interface GetTodosTodoUseCase {
  execute(): Promise<TodoEntity[]>;
}

export class GetTodos implements GetTodosTodoUseCase {
  constructor(private readonly repository: TodoRepository) {}

  execute(): Promise<TodoEntity[]> {
    return this.repository.getAll();
  }
}
