import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CoursesService } from "./course.service";
import { Course } from "./course.entity";
import { CourseController } from "./course.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Course])],
    providers: [CoursesService],
    controllers: [CourseController],
    exports: [TypeOrmModule, CoursesService]
})
export class CourseModule {}