import { ApiProperty } from '@nestjs/swagger';

export class DeleteEventDto {
    @ApiProperty({
        required: true,
        description: 'ID события которое нужно удалить'
    })
    id: number;
}