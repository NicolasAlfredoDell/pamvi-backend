import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

// Entites
import { Pet } from 'src/pets/entities/pet.entity';
import { SpeciesOfAnimals } from 'src/species-of-animals/entities/species-of-animal.entity';

@Entity()
export class BreedOfAnimal {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('timestamp')
    created_at: Date;

    @Column('boolean', {
        default: false,
    })
    disabled: boolean;

    @Column('text', {
        unique: true,
    })
    name: string;

    @OneToMany(
        () => Pet,
        (pet) => pet.breed,
        { cascade: true }
    )
    pet: Pet;

    @ManyToOne(
        () => SpeciesOfAnimals,
        (speciesOfAnimals) => speciesOfAnimals.breed,
        { cascade: true }
    )
    specie: SpeciesOfAnimals;

    @Column('timestamp')
    updated_at: Date;

    @BeforeInsert()
    setCreatedAtAndUpdateAtInsert() {
        this.created_at = new Date();
        this.updated_at = new Date();
    }

    @BeforeInsert()
    setFullNameAndSlugInsert() {
        this.setName();
    }

    @BeforeUpdate()
    setCreatedAtUpdate() {
        this.updated_at = new Date();
    }

    @BeforeUpdate()
    setFullNameAndSlugUpdate() {
        this.setName();
    }

    setName(): void {
        this.name = this.name.trim();
    }

}
