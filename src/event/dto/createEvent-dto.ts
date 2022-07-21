import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
    @ApiProperty({
        required: true,
        description: 'Текст собятия'
    })
    text: string;

    @ApiProperty({
        required: true,
        description: 'Дата события в типе Number - например результат .getTime()'
    })
    completeDate: number;

    @ApiProperty({
        required: false,
        description: 'ID метки'
    })
    markId?: number;
}