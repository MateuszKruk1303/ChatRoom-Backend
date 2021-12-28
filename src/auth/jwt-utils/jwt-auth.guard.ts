import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JWT } from '../constants';

@Injectable()
export class JwtAuthGuard extends AuthGuard(JWT) {}
