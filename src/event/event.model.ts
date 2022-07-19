import { BelongsTo, Column, DataType, HasMany, HasOne, Model, Table } from 'sequelize-typescript';
import { Mark } from '../mark/mark.model';

@Table({
    tableName: 'events'
})
export class Event extends Model<Event> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @Column({
        type: DataType.TEXT,
        unique: false,
        allowNull: false
    })
    text: string;

    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    completeDate: string;

    @BelongsTo(() => Mark, 'markId')
    mark: Mark;
}