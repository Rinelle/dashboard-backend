import { Body, Controller, Get, Post } from '@nestjs/common';
import { MarkService } from './mark.service';
import { MarkDto } from './dto/mark-dto';

@Controller('mark')
export class MarkController {
    constructor(
        private markService: MarkService
    ) { }

    @Get()
    async getMarks() {
        return {
            data: await this.markService.getMarks()
        }
    }

    @Post()
    async createMarks(@Body() data: MarkDto) {
        return {
            data: await this.markService.createMarks(data)
        }
    }
}
