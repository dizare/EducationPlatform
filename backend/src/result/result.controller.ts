import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { Public } from "src/app.noguard.decorator";
import { ResultService } from "./result.service";
import { ResultDTO } from "./result.dto";
import { Result } from "./result.entity";

@Controller('result')
export class ResultController {
    constructor(private readonly resultService: ResultService) {}

    @Public()
    @Get(':id')
    async getResult(@Param('id') id: number) {
        return this.resultService.findOneById(id);
    }

    @Public()
    @Post('createResult')
    async createResult(@Body() body: { resultDTO: ResultDTO, userId: number, taskId: number }): Promise<Result> {
        const { resultDTO, userId, taskId } = body;
        return await this.resultService.create(resultDTO, userId, taskId);
    }
}
