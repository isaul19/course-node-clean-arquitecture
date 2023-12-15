import { TodoDatasource } from "@/domain/datasources";
import { TodoRepository } from "@/domain/repositories";
import { CreateTodoDto, UpdateTodoDto } from "@/domain/dtos/todo";
import { TodoEntity } from "@/domain/entities";

export class TodoRepositoryImpl implements TodoRepository {
  constructor(private readonly datasource: TodoDatasource) {}

  create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    return this.datasource.create(createTodoDto);
  }

  getAll(): Promise<TodoEntity[]> {
    return this.datasource.getAll();
  }

  getById(id: number): Promise<TodoEntity> {
    return this.datasource.getById(id);
  }

  updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    return this.datasource.updateById(updateTodoDto);
  }

  deleteById(id: number): Promise<TodoEntity> {
    return this.datasource.deleteById(id);
  }
}
