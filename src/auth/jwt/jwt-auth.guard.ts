import { Injectable } from '@nestjs/common';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { JWT } from '../constants';

@Injectable()
export class JwtAuthGuard extends AuthGuard(JWT) {}
