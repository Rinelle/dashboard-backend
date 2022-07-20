import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { EventModule } from './event/event.module';
import { MarkModule } from './mark/mark.module';
import { Mark } from './mark/mark.model';
import { Event } from './event/event.model';
import { MarkService } from './mark/mark.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env'
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            models: [Mark, Event],
            autoLoadModels: true
        }),
        EventModule,
        MarkModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
