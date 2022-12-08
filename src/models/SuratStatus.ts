import { Column, DataType, Model, Table, Unique } from "sequelize-typescript";

@Table
export class SuratStatus extends Model<SuratStatus>{
    @Column({
        type: DataType.STRING(2),
        primaryKey: true,
        allowNull: false,
    })
    public status!: string;

    @Column({
        type: DataType.STRING(60),
        allowNull: false,
    })
    public description!: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    public level!: number;
}