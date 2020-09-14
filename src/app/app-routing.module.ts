import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PokemonListComponent} from './pokemon-list/pokemon-list.component';
import {PokemonFavoritesComponent} from './pokemon-favorites/pokemon-favorites.component';

const routes: Routes = [
  {path: 'pokemons', component: PokemonListComponent},
  {path: '', redirectTo: 'pokemons', pathMatch: 'full'},
  {path: 'favorites', component: PokemonFavoritesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
