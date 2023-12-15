import { prisma } from "@/database/postgress";
import { TodoDatasource } from "@/domain/datasources";
import { CreateTodoDto, UpdateTodoDto } from "@/domain/dtos";
import { TodoEntity } from "@/domain/entities";

export class TodoDataSourceImpl implements TodoDatasource {
  public async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    const todo = await prisma.todo.create({ data: createTodoDto! });

    return TodoEntity.getObject(todo);
  }

  public async getAll(): Promise<TodoEntity[]> {
    const todos = await prisma.todo.findMany();

    return todos.map((todo) => TodoEntity.getObject(todo));
  }

  public async getById(id: number): Promise<TodoEntity> {
    const todo = await prisma.todo.findFirst({ where: { id: id } });

    if (!todo) throw new Error(`Todo with id: ${id} not found`);

    return TodoEntity.getObject(todo);
  }

  public async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    await this.getById(updateTodoDto.id);

    const updatedTodo = await prisma.todo.update({
      where: { id: updateTodoDto.id },
      data: updateTodoDto!.values,
    });

    return TodoEntity.getObject(updatedTodo);
  }

  public async deleteById(id: number): Promise<TodoEntity> {
    await this.getById(id);

    const deletedTodo = await prisma.todo.delete({
      where: { id: id },
    });

    return TodoEntity.getObject(deletedTodo);
  }
}
