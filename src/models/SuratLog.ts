import { Column, DataType, Model, Table, ForeignKey } from "sequelize-typescript";
import { Surat } from "./Surat";

@Table
export class SuratLog extends Model<SuratLog>{
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    public id!: number;

    @ForeignKey(() => Surat)
    @Column({
        type: DataType.INTEGER,
    })
    public id_surat!: number;

    @Column({
        type: DataType.STRING(2),
        allowNull: false,
    })
    public status!: string;

    @Column({
        type: DataType.STRING(100),
        allowNull: false,
        defaultValue: ""
    })
    public keterangan!: string;

    @Column({
        type: DataType.STRING(60),
        allowNull: false,
        defaultValue: "",
    })
    public createdBy!: string;
}