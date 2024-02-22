import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true,
    })
    dni: string;

    @Column('date')
    birthday: Date;

    @Column('text', {
        unique: true,
    })
    email: string;

    @Column('text', {
        nullable: true,
    })
    facebook: string;

    @Column('text', {
        nullable: true,
    })
    instagram: string;

    @Column('text')
    lastname: string;

    @Column('text')
    name: string;

    @Column('text')
    slug: string;

    @Column('text', {
        nullable: true,
    })
    twitter: string;

    @Column('int')
    years: number;

    @Column('boolean')
    disabled: boolean;

    @Column('date')
    created_at: Date;

    @Column('date')
    updated_at: Date;

    // FALTA GENERO
    // FALTA TIPO DE USUARIO
    // FALTA LOCACION
    // AVATAR

    @BeforeInsert()
    setFullNameAndSlugInsert() {
        this.setFullNameAndSlug();
    }

    @BeforeInsert()
    setCreatedAtInsert() {
        this.created_at = new Date();
    }

    @BeforeInsert()
    setDisabledInsert() {
        this.disabled = false;
    }

    @BeforeInsert()
    setYearsInsert() {
        this.setYears();
    }

    @BeforeUpdate()
    setFullNameAndSlugUpdate() {
        this.setFullNameAndSlug();
    }

    @BeforeUpdate()
    setCreatedAtUpdate() {
        this.created_at = new Date();
    }

    @BeforeInsert()
    setDisabledUpdate() {
        this.disabled = false;
    }

    @BeforeInsert()
    setYearsUpdate() {
        this.setYears();
    }

    private setFullNameAndSlug(): void {
        this.name = this.name.toLocaleLowerCase().trim();
        this.name = this.name.charAt(0).toUpperCase() + this.name.slice(1);
    
        this.lastname = this.lastname.toLocaleLowerCase().trim();
        this.lastname = this.lastname.charAt(0).toUpperCase() + this.lastname.slice(1);
    
        this.slug = `${this.name}_${this.lastname}_${this.dni}`;
    }

    private setYears(): void {
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
