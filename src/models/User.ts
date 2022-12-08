import { Column, DataType, ForeignKey, Model, Table, Unique } from "sequelize-typescript";
import { SuratStatus } from "./SuratStatus";

@Table
export class User extends Model<User>{
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    public id!: number;

    @Unique
    @Column({
        type: DataType.STRING(60),
        allowNull: false,
    })
    public username!: string;

    @Column({
        type: DataType.STRING(120),
        allowNull: false,
    })
    public password!: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    public level!: number;

    @ForeignKey(() => SuratStatus)
    @Column({
        type: DataType.STRING(2),
        allowNull: false,
    })
    public status!: string;
}