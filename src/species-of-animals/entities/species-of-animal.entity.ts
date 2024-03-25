import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

// Entites
import { Pet } from 'src/pets/entities/pet.entity';
import { User } from 'src/users/entities';

@Entity()
export class SpeciesOfAnimals {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('timestamp')
    created_at: Date;

    @Column('boolean', {
        default: false,
    })
    disabled: boolean;

    @Column('text',{
        unique: true,
    })
    name: string;

    @OneToMany(
        () => Pet,
        (pet) => pet.specie,
        { cascade: true }
    )
    pet: Pet;

    @Column('timestamp')
    updated_at: Date;

    @OneToMany(
        () => User,
        (user) => user.gender,
        { cascade: true }
    )
    user: User;

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
