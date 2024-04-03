import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

// Entities
import { AnimalShelter } from 'src/animal-shelter/entities/animal-shelter.entity';
import { GenderOfUser } from 'src/gender-of-users/entities/gender-of-user.entity';
import { Pet } from "src/pets/entities/pet.entity";
import { TypesOfUser } from 'src/types-of-users/entities/types-of-user.entity';
import { UserImage } from './user-image.entity';
import { Report } from 'src/reports/entities/report.entity';

@Entity()
export class User {

    // FALTA LOCACION

    @ManyToMany(
        () => AnimalShelter,
        (animalShelter) => animalShelter.ownerUser,
        { cascade: true }
    )
    animalShelter: AnimalShelter;

    @Column('text', {
        nullable: true,
    })
    avatar: string;

    @Column('date')
    birthday: Date;
    
    @Column('timestamp')
    created_at: Date;
    
    @Column('boolean', {
        default: true,
    })
    disabled: boolean;

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

    @OneToMany(
        () => UserImage,
        (userImage) => userImage.user,
        { cascade: true }
    )
    images?: UserImage[];

    @Column('text', {
        nullable: true,
    })
    instagram: string;

    @Column('bool')
    isVeterinarian: boolean;

    @Column('text')
    lastnames: string;

    @Column('text', {
        nullable: true,
    })
    mercadopago: string;

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
        (pet) => pet.userOwner,
        { cascade: true }
    )
    pet: Pet;

    @OneToOne(
        () => Pet,
        (pet) => pet.userTemporallyBeneficiary,
        { onDelete: 'CASCADE', nullable: true }
    )
    petForAdopt: User;

    @OneToMany(
        () => Report,
        (report) => report.user,
        { cascade: true }
    )
    report: Report;

    @Column('text', {
        nullable: true,
    })
    twitter: string;

    @ManyToOne(
        () => TypesOfUser,
        (typeOfUser) => typeOfUser.user,
        { onDelete: 'CASCADE' }
    )
    typeOfUser: TypesOfUser;

    @Column('timestamp')
    updated_at: Date;

    @Column('int')
    years: number;

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
