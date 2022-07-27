import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { EventService } from './event.service';
import { EventDto } from './dto/event-dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetEventDto } from './dto/getEvent-dto';
import { DeleteEventDto } from './dto/deleteEvent-dto';
import { CreateEventDto } from './dto/createEvent-dto';

@Controller('event')
export class EventController {
    constructor(
        private eventService: EventService
    ) { }

    @Get()
    @ApiResponse({
        status: 200,
        description: 'Возврщает все события согласно переданным параметрам',
        type: [EventDto]
    })
    @ApiTags('События')
    async getMarks(@Query() query: GetEventDto) {
        return {
            data: await this.eventService.getEvents(query)
        }
    }

    @Post()
    @ApiResponse({
        status: 200,
        description: 'Создание события'
    })
    @ApiTags('События')
    @ApiBody({ type: CreateEventDto })
    async createMarks(@Body() data: CreateEventDto) {
        return {
            data: await this.eventService.createEvent(data)
        }
    }

    @Delete()
    @ApiResponse({
        status: 200,
        description: 'Удаление события по ID'
    })
    @ApiTags('События')
    @ApiBody({ type: DeleteEventDto })
    async deleteEvent(@Body() data: DeleteEventDto) {
        return {
            data: await this.eventService.deleteEvent(data.id)
        }
    }
}
