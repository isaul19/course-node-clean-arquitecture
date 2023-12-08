export class CreateTodoDto {
  private constructor(public readonly text: string) {}

  static create(props: { [key: string]: any }): [string?, CreateTodoDto?] {
    const { text } = props;

    console.log(text);

    if (!text) return ["Text is required", undefined];
    if (text.trim().length < 3) return ["Text is too short", undefined];

    return [undefined, new CreateTodoDto(text)];
  }
}
