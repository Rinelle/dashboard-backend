import { Body, Controller, Get, Post } from '@nestjs/common';
import { MarkService } from './mark.service';
import { MarkDto } from './dto/mark-dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('mark')
export class MarkController {
    constructor(
        private markService: MarkService
    ) { }

    @Get()
    @ApiResponse({
        status: 200,
        description: 'Получение всех меток',
        type: [MarkDto]
    })
    @ApiTags('Метки')
    async getMarks() {
        return {
            data: await this.markService.getMarks()
        }
    }

    @Post()
    @ApiResponse({
        status: 200,
        description: 'Создание метки'
    })
    @ApiTags('Метки')
    @ApiBody({
        type: MarkDto
    })
    async createMarks(@Body() data: MarkDto) {
        return {
            data: await this.markService.createMarks(data)
        }
    }
}
