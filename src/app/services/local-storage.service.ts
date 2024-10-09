import { Injectable } from '@angular/core';
import { raceWith } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly key = 'fav:filmes';

  private favoritos: number[];

  constructor() {
    this.favoritos = this.getFavoritos();
  }

  public saveFavoritos(id: number): boolean {
    if (this.alreadyFavorito(id)) return false;

    this.favoritos.push(id);

    return this.saveStringify();
  }

  public removeFavorito(id: number): boolean {
    if (!this.alreadyFavorito(id)) return false;

    this.favoritos = this.favoritos.filter((x) => x != id);

    return this.saveStringify();
  }

  private saveStringify() {
    const jsonString = JSON.stringify(this.favoritos);

    localStorage.setItem(this.key, jsonString);

    return true;
  }

  public alreadyFavorito(id: number) {
    return this.favoritos.includes(id);
  }

  private getFavoritos(): number[] {
    const jsonString = localStorage.getItem(this.key);

    if (!jsonString) return [];

    const favoritos = JSON.parse(jsonString) as number[];

    return favoritos;
  }
}
