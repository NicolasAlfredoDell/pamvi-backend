import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { User } from "./user.entity";

@Entity()
export class UserImage {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column('text',{
        unique: true
    })
    url: string;

    @ManyToOne(
        () => User,
        (user) => user.avatar,
        { onDelete: 'CASCADE' }
    )
    user: User;

}