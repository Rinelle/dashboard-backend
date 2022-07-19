import { Module } from '@nestjs/common';
import { MarkService } from './mark.service';
import { MarkController } from './mark.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Mark } from './mark.model';
import { Event } from '../event/event.model';

@Module({
    providers: [MarkService],
    controllers: [MarkController],
    imports: [
        SequelizeModule.forFeature([Mark, Event])
    ],
    exports: [
        MarkService
    ]
})
export class MarkModule {
}
