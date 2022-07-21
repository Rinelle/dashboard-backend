import { ApiProperty } from '@nestjs/swagger';

export class GetEventDto {
    @ApiProperty({
        required: true,
        description: 'Дата поиска события. В типе - number например результат getTime()'
    })
    day: number;

    @ApiProperty({
        required: false,
        description: 'ID метки события'
    })
    markId?: number;
}