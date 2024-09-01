class ApiError extends Error {
  constructor(
    message = "Something went wrong",
    statusCode = 500,
    errors = [],
    stack = ""
  ) {
    super(message);
    this.success = false;
    this.message = message;
    this.statusCode = statusCode;
    this.errors = errors;
    this.data = null;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
