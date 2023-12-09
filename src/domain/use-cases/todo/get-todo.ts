import { TodoEntity } from "@/domain/entities";
import { TodoRepository } from "@/domain/repositories";

export interface GetTodoTodoUseCase {
  execute(id: number): Promise<TodoEntity>;
}

export class GetTodo implements GetTodoTodoUseCase {
  constructor(private readonly repository: TodoRepository) {}

  execute(id: number): Promise<TodoEntity> {
    return this.repository.getById(id);
  }
}
