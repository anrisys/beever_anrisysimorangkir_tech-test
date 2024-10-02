import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  UserLoginRequest,
  UserRegistrationRequest,
  UsersSchema,
} from 'src/users/users.schema';
import { UserLoginResponse } from './auth.model';
import { ZodValidationPipe } from 'src/common/validation.pipe';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('/api/auth')
@Controller('/api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'User Registration',
    description: 'Allow visitor to register in this application',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User successfully registered.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request when registration data inputted are invalid.',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'demo@example.com' },
        password: { type: 'string', example: 'UserExample123#!' },
      },
    },
  })
  @UsePipes(new ZodValidationPipe(UsersSchema.UserRegistrationRequest))
  async register(
    @Body() request: UserRegistrationRequest,
  ): Promise<Record<string, string>> {
    const result: boolean = await this.authService.register(request);
    if (result) {
      return {
        message: 'User successfully registered',
      };
    }
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'User Login',
    description: 'Allow visitor to login to application',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User successfully login.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request when login data inputted are invalid.',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'demo@example.com' },
        password: { type: 'string', example: 'UserExample123#!' },
      },
    },
  })
  @UsePipes(new ZodValidationPipe(UsersSchema.UserLoginRequest))
  async login(@Body() request: UserLoginRequest) {
    const result: UserLoginResponse = await this.authService.login(request);
    return {
      message: 'Successfully login',
      data: result,
    };
  }
}
