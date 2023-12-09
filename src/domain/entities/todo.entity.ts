export class TodoEntity {
  private constructor(
    public readonly id: number,
    public readonly text: string,
    public readonly completeadAt?: Date | null
  ) {}

  public get isCompleted() {
    return !!this.completeadAt;
  }

  public static getObject(object: { [key: string]: any }) {
    const { id, text, completedAt } = object;

    if (!id) throw new Error("ID is required");
    if (!text) throw new Error("Text is required");

    let newCompleteadAt = new Date(completedAt);
    if (isNaN(newCompleteadAt.getTime())) throw new Error("Date is invalid");

    return new TodoEntity(id, text, completedAt);
  }
}
