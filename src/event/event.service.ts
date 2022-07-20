import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Mark } from '../mark/mark.model';
import { Event } from './event.model';
import { EventDto } from './dto/event-dto';
import { Op } from 'sequelize';
import { MarkService } from '../mark/mark.service';

@Injectable()
export class EventService {
    constructor(
        @InjectModel(Event)
        private eventRepository: typeof Event,
        private markService: MarkService
    ) {}

    async getEvents(params: { day?: number; markId?: number; }) {
        const where = {};
        if (params.day) {
            if (isNaN(Number(params.day))) {
                throw new HttpException('Дата должна быть в формате number', HttpStatus.BAD_REQUEST);
            }
            const sendDate = new Date(Number(params.day));

            const startDate = new Date(sendDate.getFullYear(), sendDate.getMonth(), sendDate.getDate());
            const endDate = new Date(new Date(startDate).setDate(startDate.getDate() + 1));

            where['completeDate'] = {
                [Op.between]: [startDate, endDate]
            }
        }
        try {
            return this.eventRepository.findAll({
                attributes: ['id', 'text', 'completeDate'],
                where: where ? where : {},
                include: [
                    {
                        model: Mark,
                        attributes: ['id', 'title', 'color']
                    }
                ]
            })
                .then(res => res
                    .map(item => item.get({ plain: true }))
                    .map(item => Object.assign({}, item, { isExpired: new Date(item.completeDate).getTime() < Date.now() }))
                )
        } catch (e) {
            throw e;
        }
    }

    async createEvent(data: EventDto) {
        if (!(data.text && data.completeDate)) {
            throw new HttpException('Не заданы текст и дата', HttpStatus.BAD_REQUEST)
        }

        if (isNaN(Number(data.completeDate))) {
            throw new HttpException('Дата должна быть в формате числа', HttpStatus.BAD_REQUEST);
        }

        const isExist = await this.eventRepository.findOne({
            where: {
                completeDate: new Date(data.completeDate).toISOString()
            }
        });

        if (isExist) {
            throw new HttpException('Событие на эту дату уже существует', HttpStatus.BAD_REQUEST);
        }

        try {
            const result = await this.eventRepository.create({
                text: data.text,
                completeDate: new Date(data.completeDate).toISOString(),
                markId: data.markId || null
            });

            if (result) {
                return {
                    message: 'Событие успешно создано'
                }
            }

            throw new HttpException('Событие не создано', HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (e) {
            throw e;
        }
    }

    async deleteEvent(id: number) {
        try {
            if (!id) {
                throw new HttpException('Необходимо передать id события', HttpStatus.BAD_REQUEST);
            }

            const existedEvent = await this.eventRepository.findByPk(id);

            if (!existedEvent) {
                throw new HttpException('События с таким id не существует', HttpStatus.BAD_REQUEST);
            }
            const result = await this.eventRepository.destroy({
                where: {
                    id
                }
            });

            if (result) {
                return {
                    message: 'Событие удалено'
                }
            }
        } catch (e) {
            throw e;
        }
    }
}
