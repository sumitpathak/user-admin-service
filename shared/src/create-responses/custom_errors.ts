import { HttpException, HttpStatus } from '@nestjs/common';
import { ERROR_CODES } from './api_response.model';

class AppError extends HttpException {
  public constructor(
    public message: string,
    public statusCode: HttpStatus,
    public code: ERROR_CODES,
  ) {
    super(message, statusCode);
  }
}
export default AppError;
