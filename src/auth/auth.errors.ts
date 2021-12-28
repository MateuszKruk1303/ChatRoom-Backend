import { HttpException } from '@nestjs/common';

interface HttpExceptionFields {
  message: string;
  code: number;
}

const { message: loginMessage, code: loginCode }: HttpExceptionFields = {
  message: 'Incorrect login or password',
  code: 401,
};

export const loginError = new HttpException(loginMessage, loginCode);
