type ValidNames = 'Canario'|'Cobaya'|'Conejo'|'Erizo'|'Gato'|'Hamster'|'Hurón'
    |'Lagarto'|'Loro'|'Paloma'|'Perico'|'Pez'|'Perro'|'Rana'|'Rata'|'Salamandra'|'Serpiente'|'Tortuga';

export interface SeedBreedOfAnimal {

    created_at:     Date;
    disabled:       boolean;
    name:           ValidNames;
    updated_at?:    Date;

}