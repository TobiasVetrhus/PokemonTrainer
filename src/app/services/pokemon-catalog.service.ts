import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../models/pokemon.model';
import { Observable, finalize, map, of } from 'rxjs';
import { PokemonApiResponse } from '../models/Pokemon-api-response';
import { StorageUtil } from '../utils/storage.util';
const { apiPokemons } = environment;
@Injectable({
  providedIn: 'root'
})
export class PokemonCatalogService {
  private _pokemons: Pokemon[] = [];
  private _error: string = "";
  private _loading: boolean = false;
  get pokemons(): Pokemon[] {
    return this._pokemons;
  }
  get loading(): boolean {
    return this._loading;
  }
  get error(): string {
    return this._error;
  }
  constructor(private readonly http: HttpClient) { }
  public findAllPokemon(): Observable<Pokemon[]> {
    const storedPokemons = StorageUtil.sessionStorageRead<Pokemon[]>('pokemons');
    if (storedPokemons) {
      this._pokemons = storedPokemons;
      return of(this._pokemons);
    }
    this._loading = true;
    return this.http.get<PokemonApiResponse>(apiPokemons)
      .pipe(
        finalize(() => {
          this._loading = false;
        }),
        map((response: PokemonApiResponse) => {
          this._pokemons = response.results;
          StorageUtil.sessionStorageSave('pokemons', this._pokemons);
          return this._pokemons; // Return the updated array
        })
      );
  }
  public findPokemonByName(name: string): Pokemon | undefined {
    this.findAllPokemon()
    return this._pokemons.find((pokemon: Pokemon) => pokemon.name === name);
  }
}
