// Interfaces
import { SeedGendersOfUsers, SeedTypesOfUsers, SeedUser } from "./";

export interface SeedData {
    
    gendersOfUsers: SeedGendersOfUsers[],
    typesOfUsers: SeedTypesOfUsers[],
    users: SeedUser[],

}