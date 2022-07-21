import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function start() {
    const PORT = process.env.PORT || 4000,
        app = await NestFactory.create(AppModule, {cors: true});

    app.setGlobalPrefix('api');

    //swagger
    const config = new DocumentBuilder()
        .setTitle('Dashboard')
        .setDescription('Документация к работе по Dashboard')
        .setVersion('1.0')
        .addTag('dashboard')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(PORT, () => console.log(`Server started on port - ${PORT}`));
}

start();
