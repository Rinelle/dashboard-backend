import { ApiProperty } from '@nestjs/swagger';

export class EventDto {
    @ApiProperty({
        required: true,
        description: 'Текст события'
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

    @ApiProperty({
        required: true,
        description: 'Флаг, отвечает за то просрочено событие или нет по отношению к текущему времени'
    })
    isExpired: boolean;
}