import { Column, DataType, Model, Table, Unique } from "sequelize-typescript";

@Table
export class Surat extends Model<Surat> {
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
        defaultValue: ""
    })
    public no_surat!: string;

    @Column({
        type: DataType.STRING(60),
        allowNull: false,
    })
    public nik!: string;

    @Column({
        type: DataType.STRING(60),
        allowNull: false,
    })
    public nama!: string;

    @Column({
        type: DataType.STRING(60),
        allowNull: false,
    })
    public no_hp!: string;

    @Column({
        type: DataType.STRING(60),
        allowNull: false,
    })
    public email!: string;

    @Column({
        type: DataType.STRING(60),
        allowNull: false,
    })
    public tujuan!: string;

    @Column({
        type: DataType.STRING(60),
        allowNull: false,
    })
    public judul!: string;

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
        type: DataType.STRING(60),
        allowNull: false,
        defaultValue: "",
    })
    public createdBy!: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: "1970-01-01 00:00:00",
    })
    public tgl_selesai: string = "1970-01-01 00:00:00";
}