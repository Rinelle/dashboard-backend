import { ApiProperty } from '@nestjs/swagger';

export class MarkDto {
    @ApiProperty({
        required: true,
        description: 'Название метки'
    })
    title: string;

    @ApiProperty({
        required: true,
        description: 'Цвет метки в читаемом стилями формате (#000000)'
    })
    color: string
}