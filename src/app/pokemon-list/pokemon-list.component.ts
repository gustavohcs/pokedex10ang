import { Component, OnInit } from '@angular/core';
import {Pokemon} from '../pokemon';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {PokemonService} from '../services/pokemon.service';
import {StorageService} from '../services/storage.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  form: FormGroup;
  regionData: Array<any> = [
    { name: 'Generation I', value: '1'},
    { name: 'Generation II', value: '2'},
    { name: 'Generation III', value: '3'},
    { name: 'Generation IV', value: '4'},
    { name: 'Generation V', value: '5'},
    { name: 'Generation VI', value: '6'},
    { name: 'Generation VII', value: '7'},
  ];
  pokemons: Pokemon[];
  pokemonsRegion: Pokemon[];
  pokemonFilterList: Pokemon[];
  pokemonSelected: Pokemon;
  pokemonsFavorite: Pokemon[];
  radGalar: any;
  pokedexRegion: string;
  flag1: boolean;
  flag2: boolean;
  flag3: boolean;
  flag4: boolean;
  flag5: boolean;
  flag6: boolean;
  flag7: boolean;
  national: any;
  filterString: string;
  flagAdd: boolean;
  constructor(private pokemonService: PokemonService, private fb: FormBuilder, private storageService: StorageService) {
    this.pokemonsFavorite = storageService.getData('pokemonStorage') || [];
  }

  ngOnInit(): void {
    this.pokemonSelected = new Pokemon();
    this.form = this.fb.group({
      name: this.fb.array([])
    });
    this.pokedexRegion = 'National';
    this.filterString = '';
    this.getFirstGen();
    this.findListByPokedexAndFilterByGen();
    this.flag1 = true;
    this.flag2 = false;
    this.flag3 = false;
    this.flag4 = false;
    this.flag5 = false;
    this.flag6 = false;
    this.flag7 = false;
    this.flagAdd = false;
    this.getPokemon('https://pokeapi.co/api/v2/pokemon-species/1/');
    this.onStart();
  }

  findByRegion(region: string): any{
    this.pokedexRegion = region;
    this.findListByPokedexAndFilterByGen();
  }

  onStart(): any {
    const generations = (this.form.controls.name as FormArray);
    generations.push(new FormControl('Generation I'));
    generations.push(new FormControl('Generation II'));
    generations.push(new FormControl('Generation III'));
    generations.push(new FormControl('Generation IV'));
    generations.push(new FormControl('Generation V'));
    generations.push(new FormControl('Generation VI'));
    generations.push(new FormControl('Generation VII'));
  }

  onChange(name: string, isChecked: boolean): any {
    const generations = (this.form.controls.name as FormArray);

    if (!isChecked) {
      generations.push(new FormControl(name));
    } else {
      const index = generations.controls.findIndex(x => x.value === name);
      generations.removeAt(index);
    }
  }

  searchGen(gen: string, flag: boolean): any {
    this.pokemonService.getPokemonListByGeneration(gen).subscribe(data => {
      if (flag === true){
        this.pokemonsRegion = this.pokemonsRegion.concat(data.pokemon_species);
      }
      else {
        this.pokemonsRegion = this.pokemonsRegion.filter(obj =>
          !data.pokemon_species.some(obj2 => obj.name === obj2.name));
      }
      this.findListByPokedexAndFilterByGen();
    });
  }

  findListByPokedexAndFilterByGen(): any {
    this.pokemonService.getPokemonListByPokedex(this.pokedexRegion).subscribe(data => {
      // @ts-ignore
      this.pokemons = data.pokemon_entries;
      this.filterPokedexWithGens(this.pokemons, this.pokemonsRegion);
    });
  }
  getPokemon(url: string): any {
    this.flagAdd = false;
    this.pokemonService.getPokemonSpecies(url).subscribe(data => {
      this.pokemonService.getPokemonImage(data.name).subscribe( dataResult => {
        this.pokemonSelected.image = dataResult.sprites.front_default;
      });
      this.pokemonSelected.name = data.name;
      this.pokemonSelected.color = data.color.name;
      this.pokemonSelected.shape = data.shape.name;
      this.pokemonSelected.generation = data.generation.name;
      this.pokemonSelected.flavorText = data.flavor_text_entries[0].flavor_text;
      this.pokemonSelected.habitat = data.habitat.name;
      this.pokemonService.getPokemonImage(data.name).subscribe( dataResult => {
        this.pokemonSelected.image = dataResult.sprites.front_default;
      });
    });
  }

  filterPokedexWithGens(pokedexList: any, regionList: any): any{
    this.pokemonFilterList = [];
    this.pokemonFilterList = pokedexList.filter(obj => regionList.some(obj2 => obj.pokemon_species.name === obj2.name));
  }

  getFirstGen(): any{
    this.pokemonService.getPokemonListByGeneration('1').subscribe(data => {
      this.pokemonsRegion = data.pokemon_species;
    });
  }

  valuechange(newValue): any {
    this.filterString = newValue;
  }

  addFavorite(pokemonSelected: Pokemon): any {
    let i;
    let flag = false;
    for (i = 0; i < this.pokemonsFavorite.length; i++) {
      if (this.pokemonsFavorite[i].name === pokemonSelected.name) {
        flag = true;
      }
    }
    if (flag === false){
      this.pokemonsFavorite.push(pokemonSelected);
      this.storageService.setData('pokemonStorage', this.pokemonsFavorite);
    }
    this.flagAdd = true;
    this.pokemonsFavorite = this.storageService.getData('pokemonStorage');
  }
}
