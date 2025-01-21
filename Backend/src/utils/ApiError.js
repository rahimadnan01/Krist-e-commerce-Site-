class ApiError extends Error {
  constructor(statusCode = 500, message = 'Some thing went wrong') {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }
}

export { ApiError };
