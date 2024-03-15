type ValidNames = 'Usuario'|'Administrador'|'Super administrador';

export interface SeedTypesOfUsers {

    disabled:     boolean;
    created_at:   Date;
    name:         ValidNames;
    updated_at?:  Date;

}