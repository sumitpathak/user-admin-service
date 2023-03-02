import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
  PayloadTooLargeException,
  UnauthorizedException,
} from '@nestjs/common';
// import { Controller } from '@nestjs/common/interfaces';
import { ApplicationError, ERROR_CODES } from './api_response.model';

export const createErrorResponse = (error: any): HttpException => {
  const errorResponse = {
    errorCode: error.code || ERROR_CODES.UNKNOWN_ERROR,
    errorDescription: error.message,
  };
  switch (error.status) {
    case HttpStatus.UNAUTHORIZED:
      throw new UnauthorizedException(errorResponse);
    case HttpStatus.BAD_REQUEST:
      throw new BadRequestException(errorResponse);
    case HttpStatus.NOT_FOUND:
      throw new NotFoundException(errorResponse);
    case HttpStatus.CONFLICT:
      throw new ConflictException(errorResponse);
    case HttpStatus.NOT_ACCEPTABLE:
      throw new NotAcceptableException(errorResponse);
    case HttpStatus.PAYLOAD_TOO_LARGE:
      throw new PayloadTooLargeException(errorResponse);
    case HttpStatus.INTERNAL_SERVER_ERROR:
      throw new InternalServerErrorException(errorResponse);
    default:
      throw new InternalServerErrorException(errorResponse);
  }
};

export const createApiResponse = async (
  context: any,
  invokeFunction: (...args: any[]) => any,
  args?: any[],
): Promise<any | ApplicationError> => {
  try {
    return args
      ? await invokeFunction.apply(context, args)
      : await invokeFunction.apply(context);
  } catch (error: any) {
    createErrorResponse(error);
  }
  return createErrorResponse(new Error('something went wrong'));
};
