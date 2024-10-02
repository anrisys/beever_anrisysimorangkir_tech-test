import { HttpException, Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';
import {
  UserLoginRequest,
  UserRegistrationRequest,
} from 'src/users/users.schema';
import { UserLoginResponse } from './auth.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async register(request: UserRegistrationRequest): Promise<boolean> {
    const isEmailAlreadyRegistered = await this.usersRepository.findByEmail(
      request.email,
    );

    if (isEmailAlreadyRegistered) {
      throw new HttpException('Email is already register', 400);
    }

    await this.usersRepository.save(request);

    return true;
  }

  async login(request: UserLoginRequest): Promise<UserLoginResponse> {
    const user = await this.usersRepository.findByEmail(request.email);

    if (!user) {
      throw new HttpException('Email is not found', 400);
    }

    const isPasswordCorrect = await this.usersRepository.comparePassword(
      request.password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new HttpException('Email or password is wrong', 400);
    }

    const payload = { sub: user.id, email: user.email };

    return {
      id: user.id,
      access_token: await this.generateToken(payload),
    };
  }

  async generateToken(payload: {
    sub: string;
    email: string;
  }): Promise<string> {
    return await this.jwtService.signAsync(payload);
  }
}
