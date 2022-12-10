import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Surat } from "./Surat";

@Table
export class SuratAttachment extends Model<SuratAttachment>{
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    public id!: number;

    @ForeignKey(() => Surat)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    public id_surat!: number;

    @Column({
        type: DataType.STRING(200),
        allowNull: false,
    })
    public lampiran!: string;

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
        defaultValue: ""
    })
    public createdBy!: string;
}