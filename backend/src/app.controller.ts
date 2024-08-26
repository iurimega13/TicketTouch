import { Controller, Get } from '@nestjs/common'; 
import { AppService } from './app.service'; 

@Controller('api') 
export class AppController {
  constructor(private readonly appService: AppService) {} 

  @Get('data') // Endpoint path
  getData(): string {
    return 'Dados do endpoint /api/data';
  }
}
