import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Auth {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true,
    })
    dni: string;

    @Column('date')
    birthday: Date;

    @Column('text', {
        unique: true,
    })
    email: string;

    @Column('text', {
        nullable: true,
    })
    facebook: string;

    @Column('text', {
        nullable: true,
    })
    instagram: string;

    @Column('text')
    lastname: string;

    @Column('text')
    name: string;

    @Column('text', {
        nullable: true,
    })
    twitter: string;

    @Column('int')
    years: number;

    @Column('boolean')
    disabled: boolean;

    @Column('date')
    created_at: Date;

    @Column('date')
    updated_at: Date;

    // FALTA GENERO
    // FALTA TIPO DE USUARIO
    // FALTA LOCACION 

}
