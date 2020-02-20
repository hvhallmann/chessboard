import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

export interface IMovement {
  id?: number;
  position: string;
  timestamp: Date;
}

@Entity()
export class Movement implements IMovement {

  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({
    type: 'varchar',
    length: 4,
  })
  public position: string = '';

  @Column({
    type: 'timestamp',
    default: () => 'now()',
  })
  public timestamp: Date = new Date();
}
