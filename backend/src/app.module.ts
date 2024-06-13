import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/user.module';
import { CourseModule } from './courses/course.module';
import { JdoodleModule } from './jdoodle/jDoodleApi.module';
import { TaskModule } from './tasks/task.module';
import { ChapterModule } from './chapters/chapter.module';
import { ResultModule } from './result/result.module';
import { UserResultModule } from './userResult/userResult.module';

@Module({
  imports: [
    
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.local'
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      inject: [ConfigService]
    }),
    TaskModule,
    ChapterModule,
    CourseModule,
    JdoodleModule,
    UsersModule,
    AuthModule,
    CourseModule,
    ResultModule,
    UserResultModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
