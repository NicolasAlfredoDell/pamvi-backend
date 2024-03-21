import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TokensValidation {

    @Column('timestamp')
    created_at: Date;

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    token: string;

    @BeforeInsert()
    setCreatedAtInsert() {
        this.created_at = new Date();
    }

}
