type ValidNames = 'Administrador'|'Protectora de animales'|'Super administrador'|'Veterinario'|'Usuario';

export interface SeedTypesOfUsers {

    created_at:   Date;
    description:  string;
    disabled:     boolean;
    name:         ValidNames;
    updated_at?:  Date;

}