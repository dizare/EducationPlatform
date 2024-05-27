// jdoodle.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { JdoodleService } from './jDoodleApi.service';
import { Public } from 'src/app.noguard.decorator';

@Controller('jdoodle')
export class JdoodleController {
  constructor(private readonly jdoodleService: JdoodleService) {}

  @Public()
  @Post('execute')
  async executeCode(
    @Body('script') script: string,
    @Body('language') language: string,
    @Body('versionIndex') versionIndex: string,
    @Body('clientId') clientId: string,
    @Body('clientSecret') clientSecret: string,
  ) {
    try {
      return this.jdoodleService.executeCode(script, language, versionIndex, clientId, clientSecret);
    } catch (error) {
      // Обработка ошибок, если это необходимо
      throw error;
    }
  }
}
