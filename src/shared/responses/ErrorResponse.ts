export class ErrorResponse {
  message?: string;
  errors: string[];

  constructor(message?: string, errors?: string[]) {
    this.message = message;
    this.errors = errors;
  }
}
