import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { MarkService } from '../mark/mark.service';
import { MarkDto } from '../mark/dto/mark-dto';
import { EventService } from './event.service';
import { EventDto } from './dto/event-dto';

@Controller('event')
export class EventController {
    constructor(
        private eventService: EventService
    ) { }

    @Get()
    async getMarks(@Query() query: { day?: number; markId?: number; }) {
        return {
            data: await this.eventService.getEvents(query)
        }
    }

    @Post()
    async createMarks(@Body() data: EventDto) {
        return {
            data: await this.eventService.createEvent(data)
        }
    }

    @Delete()
    async deleteEvent(@Body() data: { id: number }) {
        return {
            data: await this.eventService.deleteEvent(data.id)
        }
    }
}
