import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Auth {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true,
    })
    email: string;

}
