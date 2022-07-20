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

    async getOneById(id: number) {
        try {
            return this.markRepository.findByPk(id)
        } catch (e) {
            throw e;
        }
    }

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
        try {
            if (!data.title) {
                throw new HttpException('Название метки не задано', HttpStatus.BAD_REQUEST)
            }

            const result = await this.markRepository.create(data);

            if (result) {
                return {
                    message: 'Метка успешно создана'
                }
            }

            throw new HttpException('Метка не создана', HttpStatus.INTERNAL_SERVER_ERROR)
        } catch (e) {
            throw e;
        }
    }
}
