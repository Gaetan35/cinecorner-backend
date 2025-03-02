import { Controller, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  @Get()
  @ApiOperation({
    description:
      'Simple hello world endpoint used to ping the backend to keep it alive on free hosting',
  })
  getHello(): string {
    return 'Hello World!';
  }
}
