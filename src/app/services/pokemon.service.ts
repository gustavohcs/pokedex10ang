import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Pokemon} from '../pokemon';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private baseURL = 'https://pokeapi.co/api/v2/pokemon/';
  private baseRegionURL = 'https://pokeapi.co/api/v2/pokedex/';
  private baseGenerationURL = 'https://pokeapi.co/api/v2/generation/';
  private regionIndex;
  constructor(private httpClient: HttpClient) { }

  getPokemonListByPokedex(pokedexRegion: string): Observable<Pokemon[]> {
    this.solveRegionIndex(pokedexRegion);
    return this.httpClient.get<Pokemon[]>(`${this.baseRegionURL + this.regionIndex}`);
  }

  getPokemonListByGeneration(generation: string): Observable<Pokemon[]> {
    return this.httpClient.get<Pokemon[]>(`${this.baseGenerationURL + generation}`);
  }

  getPokemonSpecies(pokemonURL: string): Observable<Pokemon[]> {
    return this.httpClient.get<Pokemon[]>(`${pokemonURL}`);
  }

  solveRegionIndex(pokedexRegion: string): any{
    if (pokedexRegion === 'National') { this.regionIndex = '1'; }
    if (pokedexRegion === 'Kanto') { this.regionIndex = '2'; }
    if (pokedexRegion === 'Johto') { this.regionIndex = '7'; }
    if (pokedexRegion === 'Hoenn') { this.regionIndex = '15'; }
    if (pokedexRegion === 'Sinnoh') { this.regionIndex = '6'; }
    if (pokedexRegion === 'Unova') { this.regionIndex = '9'; }
    if (pokedexRegion === 'Kalos-Central') { this.regionIndex = '12'; }
    if (pokedexRegion === 'Kalos-Coastal') { this.regionIndex = '13'; }
    if (pokedexRegion === 'Kalos-Mountain') { this.regionIndex = '14'; }
    if (pokedexRegion === 'Alola') { this.regionIndex = '21'; }
  }

  getPokemonImage(pokemonName: string): Observable<any> {
    return this.httpClient.get<any>(`${this.baseURL + pokemonName}`);
  }

}
