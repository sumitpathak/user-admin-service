import { HttpStatus } from '@nestjs/common';

enum ERROR_CODES {
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
  RECORD_NOT_FOUND = 'RECORD_NOT_FOUND',
  UNAUTHENTICATED = 'UNAUTHENTICATED',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
}

enum RESPONSE_STATUS {
  SUCCESS = 'SUCCESS',
  CREATED = 'CREATED',
  BAD_REQUEST = 'BAD_REQUEST',
  RECORD_NOT_FOUND = 'RECORD_NOT_FOUND',
  BUSINESS_ERROR = 'BUSINESS_ERROR',
  SYS_ERROR = 'SYS_ERROR',
  UNAUTHENTICATED = 'UNAUTHENTICATED',
  CONFLICT = 'CONFLICT',
}

type ApplicationError = {
  errorCode: HttpStatus;
  errorDescription: string;
};

export { ERROR_CODES, RESPONSE_STATUS, ApplicationError };
