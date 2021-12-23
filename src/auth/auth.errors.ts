import { HttpException } from '@nestjs/common';

interface HttpExceptionFields {
  message: string;
  code: number;
}

const { message: loginMessage, code: loginCode }: HttpExceptionFields = {
  message: 'Incorrect login or password',
  code: 401,
};

const { message: existsMessage, code: existsCode }: HttpExceptionFields = {
  message: 'User with provided name already exists',
  code: 409,
};

export const loginError = new HttpException(loginMessage, loginCode);

export const userExistsError = new HttpException(existsMessage, existsCode);
