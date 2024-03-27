import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

// Entites
import { User } from 'src/users/entities';

@Entity()
export class Report {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    reason: string;

    @ManyToOne(
        () => User,
        (user) => user.report,
        { onDelete: 'CASCADE' }
    )
    user: User;

}
