import { Component, OnInit } from '@angular/core';
import {Pokemon} from '../pokemon';
import {PokemonService} from '../services/pokemon.service';
import {StorageService} from '../services/storage.service';

@Component({
  selector: 'app-pokemon-favorites',
  templateUrl: './pokemon-favorites.component.html',
  styleUrls: ['./pokemon-favorites.component.css']
})
export class PokemonFavoritesComponent implements OnInit {

  pokemonSelected: Pokemon;
  pokemonsFavorite: Pokemon[];
  flagRemove: boolean;
  private index: number;

  constructor(private pokemonService: PokemonService, private storageService: StorageService) {
    this.pokemonsFavorite = storageService.getData('pokemonStorage') || [];
    this.pokemonSelected = new Pokemon();
  }

  ngOnInit(): void {
    this.getPokemon(this.pokemonsFavorite[0]);
  }

  getPokemon(data: Pokemon): any {
    this.flagRemove = false;
    this.pokemonSelected = data;
  }

  removeFavorite(pokemonSelected: Pokemon): any {
    this.index = this.pokemonsFavorite.indexOf(pokemonSelected);
    if (this.index !== -1) {
      this.pokemonsFavorite.splice(this.index, 1);
      this.storageService.setData('pokemonStorage', this.pokemonsFavorite);
    }
    this.index = undefined;
    this.flagRemove = true;
  }

}
