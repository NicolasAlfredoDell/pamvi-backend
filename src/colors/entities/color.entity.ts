import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

// Entities
import { Pet } from 'src/pets/entities/pet.entity';

@Entity()
export class Color {

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
    hex: string;

    @Column('text',{
        unique: true,
    })
    name: string;

    @OneToMany(
        () => Pet,
        (pet) => pet.predominantColor,
        { cascade: true }
    )
    pet: Pet;

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
