import { Body, Controller, Get, Post } from '@nestjs/common';
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
    async getMarks() {
        return {
            data: await this.eventService.getEvents()
        }
    }

    @Post()
    async createMarks(@Body() data: EventDto) {
        return {
            data: await this.eventService.createEvent(data)
        }
    }
}
