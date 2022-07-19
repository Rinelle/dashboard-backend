import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Mark } from '../mark/mark.model';
import { MarkDto } from '../mark/dto/mark-dto';
import { Event } from './event.model';
import { EventDto } from './dto/event-dto';

@Injectable()
export class EventService {
    constructor(
        @InjectModel(Event)
        private eventRepository: typeof Event
    ) {}

    async getEvents() {
        try {
            return this.eventRepository.findAll({
                attributes: ['id', 'text', 'completeDate'],
                include: [
                    {
                        model: Mark,
                        attributes: ['id', 'title', 'color']
                    }
                ]
            })
        } catch (e) {
            throw e;
        }
    }

    async createEvent(data: EventDto) {
        if (!(data.text && data.completeDate)) {
            throw new HttpException('Не заданы текст и дата', HttpStatus.BAD_REQUEST)
        }

        data.completeDate = String(data.completeDate);

        try {
            return this.eventRepository.create(data);
        } catch (e) {
            throw e;
        }
    }
}
