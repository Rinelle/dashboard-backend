import {Column, DataType, HasMany, HasOne, Model, Table} from "sequelize-typescript";
import { Event } from '../event/event.model';

@Table({
    tableName: 'marks'
})
export class Mark extends Model<Mark> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @Column({
        type: DataType.STRING,
        unique: false,
        allowNull: false
    })
    title: string;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    color: string;

    @HasMany(() => Event)
    events: Event[]
}