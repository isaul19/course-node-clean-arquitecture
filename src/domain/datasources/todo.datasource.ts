import { CreateTodoDto, UpdateTodoDto } from "@/domain/dtos";
import { TodoEntity } from "@/domain/entities";

export abstract class TodoDatasource {
  abstract create(createTodoDto: CreateTodoDto): Promise<TodoEntity>;

  abstract getAll(): Promise<TodoEntity[]>;

  abstract getById(id: number): Promise<TodoEntity>;

  abstract updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity>;

  abstract deleteById(id: number): Promise<TodoEntity>;
}
