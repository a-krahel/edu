import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'weather' })
export class Weather extends Model {
  @Column({ allowNull: false })
  city: string;

  @Column({ allowNull: false })
  latitude: number;

  @Column({ allowNull: false })
  longitude: number;

  @Column({ allowNull: false, defaultValue: Date.now() })
  date: Date;

  @Column({ allowNull: false })
  temperature: number;

  @Column({ allowNull: false })
  createdBy: number;

  @Column({})
  additionalText: string;
}
