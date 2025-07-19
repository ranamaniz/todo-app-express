class ApiResponse {
  constructor({ statusCode, message, success = true, data }) {
    this.statusCode = statusCode;
    this.message = message;
    this.successs = success;
    this.data = data;
  }
}

export { ApiResponse };
