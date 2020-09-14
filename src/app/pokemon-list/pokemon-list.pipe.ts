// @ts-ignore
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'filterpokedex' })
export class PokedexPipe implements PipeTransform {
  transform(pokemons: any[], filter: string): any {
    filter = filter.toLowerCase();
    if (!pokemons || !filter) {
      return pokemons;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    return pokemons.filter(pokemon => pokemon.pokemon_species.name.indexOf(filter) !== -1);
  }
}
