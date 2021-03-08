import { Table, Column, Model, DataType, Unique } from 'sequelize-typescript';
// @ts-ignore
import { IDefineOptions } from 'sequelize-typescript/lib/interfaces/IDefineOptions';

const tableOptions: IDefineOptions = { timestamps: true } as IDefineOptions;

@Table(tableOptions)
export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    field: 'id',
  })
  id: number;

  @Column
  dateRegistered: Date;

  @Column
  lastActivity: Date;
}
