type ValidNames = 'Hombre'|'Mujer';

export interface SeedGendersOfUsers {

    disabled:       boolean;
    created_at:     Date;
    name:           ValidNames;
    updated_at?:    Date;

}