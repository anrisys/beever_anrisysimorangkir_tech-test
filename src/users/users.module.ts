import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from './users.entity';
import { UsersRepository } from './users.repository';

@Module({
  imports: [SequelizeModule.forFeature([Users])],
  providers: [UsersRepository],
  exports: [UsersRepository],
})
export class UsersModule {}
