import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class DataService {
  constructor(private httpService: HttpService) {}

  async getData() {
    const response = await firstValueFrom(
      this.httpService.get('https://api.kanye.rest/'),
    );

    return response.data.quote;
  }
}
