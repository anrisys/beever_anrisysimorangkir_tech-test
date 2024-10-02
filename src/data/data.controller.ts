import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { DataService } from './data.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('/api/data')
export class DataController {
  constructor(private dataService: DataService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Retrieve data from https://api.kanye.rest/',
    description:
      'Allow authenticated user to retrieve data from https://api.kanye.rest',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Send the data to user',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Authentication failed. Please try login again',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async getData() {
    const quote = await this.dataService.getData();

    return { quote };
  }
}
