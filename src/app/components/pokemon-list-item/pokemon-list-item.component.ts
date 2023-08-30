
import { Component, Input } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';

@Component({
  selector: 'app-pokemon-list-item',
  templateUrl: './pokemon-list-item.component.html',
  styleUrls: ['./pokemon-list-item.component.css']
})
export class PokemonListItemComponent {
  @Input() pokemon?: Pokemon;
  getPokemonImageUrl(pokemonUrl: string): string {
    // Extract the Pokémon ID from the URL
    const pokemonId = pokemonUrl.split('/').reverse()[1];
    // Construct the image URL using the extracted ID
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
  }
}
