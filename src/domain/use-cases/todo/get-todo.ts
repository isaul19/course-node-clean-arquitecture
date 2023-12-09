import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";

export interface GetTodoTodoUseCase {
  execute(id: number): Promise<TodoEntity>;
}

export class GetTodo implements GetTodoTodoUseCase {
  constructor(private readonly repository: TodoRepository) {}

  execute(id: number): Promise<TodoEntity> {
    return this.repository.getById(id);
  }
}
