
import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

export interface IUser {
    id?: number;
    name: string;
    email: string;
}

@Entity()
export class User implements IUser {

    @PrimaryGeneratedColumn()
    public id?: number;

    @Column("text")
    public name: string = '';

    @Column("text")
    public email: string = '';

    constructor(nameOrUser: string | IUser, email?: string) {
        if (!this.name) return ;
        if (typeof nameOrUser === 'string') {
            this.name = nameOrUser;
            this.email = email || '';
        } else {
            this.name = nameOrUser.name;
            this.email = nameOrUser.email;
        }
    }
}
