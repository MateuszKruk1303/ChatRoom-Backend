import { HttpException } from '@nestjs/common';

interface HttpExceptionFields {
  message: string;
  code: number;
}

const { message: existsMessage, code: existsCode }: HttpExceptionFields = {
  message: 'User with provided name already exists',
  code: 409,
};

export const userExistsError = new HttpException(existsMessage, existsCode);
