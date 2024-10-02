import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DataModule } from './data/data.module';
@Module({
  imports: [CommonModule, AuthModule, UsersModule, DataModule],
})
export class AppModule {}
