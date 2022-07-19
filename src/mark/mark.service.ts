import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Mark } from './mark.model';
import { MarkDto } from './dto/mark-dto';

@Injectable()
export class MarkService {
    constructor(
        @InjectModel(Mark)
        private markRepository: typeof Mark
    ) {}

    async getMarks() {
        try {
            return this.markRepository.findAll({
                attributes: ['id', 'title', 'color']
            })
        } catch (e) {
            throw e;
        }
    }

    async createMarks(data: MarkDto) {
        if (!data.title) {
            throw new HttpException('Название метки не задано', HttpStatus.BAD_REQUEST)
        }
        try {
            return this.markRepository.create(data);
        } catch (e) {
            throw e;
        }
    }
}
