import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Mark } from '../mark/mark.model';
import { Event } from './event.model';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { MarkModule } from '../mark/mark.module';

@Module({
    providers: [EventService],
    controllers: [EventController],
    imports: [
        SequelizeModule.forFeature([Mark, Event]),
        MarkModule
    ],
    exports: [
        EventModule
    ]
})
export class EventModule {}
