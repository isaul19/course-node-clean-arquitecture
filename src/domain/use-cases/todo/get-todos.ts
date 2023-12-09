import { TodoEntity } from "@/domain/entities";
import { TodoRepository } from "@/domain/repositories";

export interface GetTodosTodoUseCase {
  execute(): Promise<TodoEntity[]>;
}

export class GetTodos implements GetTodosTodoUseCase {
  constructor(private readonly repository: TodoRepository) {}

  execute(): Promise<TodoEntity[]> {
    return this.repository.getAll();
  }
}
