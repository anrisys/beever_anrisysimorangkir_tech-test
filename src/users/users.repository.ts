import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from './users.entity';
import * as bcrypt from 'bcrypt';
import { UserRegistrationRequest } from './users.schema';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(Users) private usersModel: typeof Users) {}

  async findById(userId: string): Promise<Users> {
    return await this.usersModel.findByPk(userId);
  }

  async findByEmail(email: string): Promise<Users> {
    return await this.usersModel.findOne({ where: { email } });
  }

  async save(data: UserRegistrationRequest): Promise<Users> {
    const hashedPassword = await this.hashPassword(data.password);
    return await this.usersModel.create({
      email: data.email,
      password: hashedPassword,
    });
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, Number(process.env.SECRET_SALT_KEY));
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
