import { BeforeInsert, BeforeUpdate, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

// Entities
import { User } from 'src/users/entities';

@Entity()
export class AnimalShelter {

    @Column('timestamp')
    created_at: Date;

    @Column('timestamp')
    dateFounded: Date;

    @Column('boolean', {
        default: false,
    })
    disabled: boolean;

    @Column('text', {
        unique: true,
    })
    email: string;
    
    @Column('text', {
        nullable: true,
    })
    facebook: string;

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        nullable: true,
    })
    instagram: string;

    @Column('text', {
        nullable: true,
    })
    mercadopago: string;

    @Column('text')
    mission: string;

    @Column('text', {
        unique: true,
    })
    name: string;

    @Column('text')
    objetive: string;

    @ManyToMany(
        () => User,
        (user) => user.animalShelter,
        { onDelete: 'CASCADE' }
    )
    @JoinTable()
    ownerUser: User[];

    @Column('text', {
        nullable: true,
    })
    twitter: string;

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
