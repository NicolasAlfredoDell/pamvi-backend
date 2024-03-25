import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

// Entities
import { GenderOfUser } from 'src/gender-of-users/entities/gender-of-user.entity';
import { TypesOfUser } from 'src/types-of-users/entities/types-of-user.entity';
import { UserImage } from "./user-image.entity";
import { Pet } from "src/pets/entities/pet.entity";

@Entity()
export class User {

    @OneToMany(
        () => UserImage,
        (userImage) => userImage.user,
        { cascade: true }
    )
    avatar?: UserImage[];

    @Column('date')
    birthday: Date;
    
    @Column('boolean', {
        default: true,
    })
    disabled: boolean;

    @Column('timestamp')
    created_at: Date;

    @Column('text', {
        unique: true,
    })
    dni: string;

    @Column('text', {
        unique: true,
    })
    email: string;
    
    @Column('text', {
        nullable: true,
    })
    facebook: string;

    @ManyToOne(
        () => GenderOfUser,
        (genderOfUser) => genderOfUser.user,
        { onDelete: 'CASCADE' }
    )
    gender: GenderOfUser;

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        nullable: true,
    })
    instagram: string;

    @Column('text')
    lastnames: string;

    @Column('text')
    names: string;

    @Column('text', {
        select: false,
    })
    password: string;

    @Column('text')
    slug: string;

    @OneToMany(
        () => Pet,
        (pet) => pet.user,
        { cascade: true }
    )
    typeOfUser: TypesOfUser;

    @Column('text', {
        nullable: true,
    })
    twitter: string;

    @Column('timestamp')
    updated_at: Date;

    @Column('int')
    years: number;

    // FALTA TIPO DE USUARIO
    // FALTA LOCACION
    // FALTA MASCOTAS

    @BeforeInsert()
    setFullNameAndSlugInsert() {
        this.setFullNameAndSlugAndEmail();
    }

    @BeforeInsert()
    setCreatedAtAndUpdateAtInsert() {
        this.created_at = new Date();
        this.updated_at = new Date();
    }

    @BeforeInsert()
    setYearsInsert() {
        this.setYears();
    }

    @BeforeUpdate()
    setFullNameAndSlugUpdate() {
        this.setFullNameAndSlugAndEmail();
    }

    @BeforeUpdate()
    setCreatedAtUpdate() {
        this.updated_at = new Date();
    }

    @BeforeUpdate()
    setYearsUpdate() {
        this.setYears();
    }

    setFullNameAndSlugAndEmail(): void {
        this.names = this.names.trim();
        this.names = this.names.charAt(0).toUpperCase() + this.names.slice(1);
    
        this.lastnames = this.lastnames.trim();
        this.lastnames = this.lastnames.charAt(0).toUpperCase() + this.lastnames.slice(1);

        this.email = this.email.toLocaleLowerCase().trim();
    
        this.slug = `${this.names.replace(' ', '_')}_${this.lastnames.replace(' ', '_')}_${this.dni}`;
    }

    setYears(): void {
        const today: Date = new Date();
        const birthdate: Date = new Date(this.birthday);
        
        let years: number = today.getFullYear() - birthdate.getFullYear();

        const actuallyMonth = today.getMonth();
        var previousMonth = birthdate.getMonth();

        if (
            previousMonth > actuallyMonth ||
            ( previousMonth === actuallyMonth && today.getDate() > today.getDate() )
        ) years--;
        
        this.years = years;
    }

}
