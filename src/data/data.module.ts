import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { DataController } from './data.controller';
import { DataService } from './data.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [AuthModule, HttpModule],
  controllers: [DataController],
  providers: [DataService],
})
export class DataModule {}
