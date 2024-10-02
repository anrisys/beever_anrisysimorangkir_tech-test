import {
  Column,
  CreatedAt,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';

@Table({})
export class Users extends Model {
  @PrimaryKey
  @Unique(true)
  @Column
  email: string;

  @Column
  password: string;

  @CreatedAt
  createdAt: Date;
}
