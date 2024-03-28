// Interfaces
import { SeedBreedOfAnimal, SeedGendersOfUsers, SeedTypesOfUsers, SeedUser } from './';

export interface SeedData {
    
    breedOfAnimals: SeedBreedOfAnimal[],
    typesOfUsers: SeedTypesOfUsers[],

    gendersOfUsers: SeedGendersOfUsers[],
    users: SeedUser[],

}