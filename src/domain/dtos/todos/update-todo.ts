export class UpdateTodoDto {
  private constructor(
    public readonly id: number,
    public readonly text?: string,
    public readonly completedAt?: Date
  ) {}

  get values() {
    const returnObj: { [key: string]: any } = {};

    if (this.text) returnObj.text = this.text;
    if (this.completedAt) returnObj.completedAt = this.completedAt;

    return returnObj;
  }
  static create(props: { [key: string]: any }): [string?, UpdateTodoDto?] {
    const { id, text, completedAt } = props;

    let newCompleteAt = completedAt;

    if (!id || !isFinite(id)) {
      return ["id not a number"];
    }

    if (completedAt) {
      newCompleteAt = new Date(completedAt);
      if (newCompleteAt.toString() === "Invalid Date") {
        return ["CompletedAt is not a valid date"];
      }
    }
    return [undefined, new UpdateTodoDto(id, text, newCompleteAt)];
  }
}
