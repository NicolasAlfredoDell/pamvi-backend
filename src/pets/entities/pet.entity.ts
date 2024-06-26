import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

// Entities
import { BreedOfAnimal } from 'src/breed-of-animals/entities/breed-of-animal.entity';
import { Color } from 'src/colors/entities/color.entity';
import { GenderOfAnimal } from 'src/gender-of-animals/entities/gender-of-animal.entity';
import { SpeciesOfAnimals } from 'src/species-of-animals/entities/species-of-animal.entity';
import { User } from 'src/users/entities';

@Entity()
export class Pet {

    @ManyToOne(
        () => BreedOfAnimal,
        (breedOfAnimal) => breedOfAnimal.pet,
        { onDelete: 'CASCADE', nullable: true }
    )
    breed: SpeciesOfAnimals;

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('date')
    birthday: Date;

    @Column('timestamp')
    created_at: Date;

    @Column('boolean', {
        default: false,
    })
    disabled: boolean;

    @ManyToOne(
        () => GenderOfAnimal,
        (genderOfAnimal) => genderOfAnimal.pet,
        { onDelete: 'CASCADE' }
    )
    gender: GenderOfAnimal;

    @Column('decimal', {
        nullable: true,
        precision: 5,
        scale: 2,
    })
    height: number;

    @Column('int', {
        nullable: true,
    })
    identificationNumber: number;

    @Column('boolean', {
        default: false,
    })
    isLost: boolean;

    @Column('text',{
        unique: true,
    })
    name: string;

    @ManyToOne(
        () => Color,
        (color) => color.pet,
        { onDelete: 'CASCADE' }
    )
    predominantColor: Color;

    @Column('int',{
        nullable: true,
    })
    registrationNumber: number;
    
    @ManyToOne(
        () => SpeciesOfAnimals,
        (specieOfAnimal) => specieOfAnimal.pet,
        { onDelete: 'CASCADE' }
    )
    specie: SpeciesOfAnimals;

    @Column('timestamp')
    updated_at: Date;

    @ManyToOne(
        () => User,
        (user) => user.pet,
        { onDelete: 'CASCADE' }
    )
    userOwner: User;

    @OneToOne(
        () => User,
        (user) => user.petForAdopt,
        { onDelete: 'CASCADE', nullable: true }
    )
    @JoinColumn()
    userTemporallyBeneficiary: User;

    @Column('decimal', {
        nullable: true,
        precision: 5,
        scale: 2,
    })
    weight: number;

    @Column('int')
    years: number;

    @BeforeInsert()
    setCreatedAtAndUpdateAtInsert() {
        this.created_at = new Date();
        this.updated_at = new Date();
    }

    @BeforeInsert()
    setFullNameAndSlugInsert() {
        this.setName();
    }

    @BeforeInsert()
    setYearsInsert() {
        this.setYears();
    }

    @BeforeUpdate()
    setCreatedAtUpdate() {
        this.updated_at = new Date();
    }

    @BeforeUpdate()
    setFullNameAndSlugUpdate() {
        this.setName();
    }

    @BeforeUpdate()
    setYearsUpdate() {
        this.setYears();
    }

    setName(): void {
        this.name = this.name.trim();
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
