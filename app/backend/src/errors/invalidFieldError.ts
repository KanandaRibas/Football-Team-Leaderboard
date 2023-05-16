export default class InvalidFieldError extends Error {
  public statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = 400;
  }
}
