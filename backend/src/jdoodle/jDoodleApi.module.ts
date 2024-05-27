import { Module } from '@nestjs/common';
import { JdoodleController } from './jDoodleApi.controller';
import { JdoodleService } from './jDoodleApi.service';

@Module({
  controllers: [JdoodleController],
  providers: [JdoodleService],
})
export class JdoodleModule {}
