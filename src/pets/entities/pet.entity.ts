import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

// Entities
import { User } from 'src/users/entities';
import { SpeciesOfAnimals } from 'src/species-of-animals/entities/species-of-animal.entity';

@Entity()
export class Pet {

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
        (user) => user.gender,
        { onDelete: 'CASCADE' }
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
