type ErrorStatusCodes = 500 | 400 | 401;

class AppError {
  public readonly message: string | string[];
  public readonly statusCode: ErrorStatusCodes;

  constructor(message: string | string[], statusCode: ErrorStatusCodes = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export { AppError };
