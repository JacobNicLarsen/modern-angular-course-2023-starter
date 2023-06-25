import { Injectable, effect, inject, signal } from '@angular/core';
import { Meme, Post, Todos } from '../modules';
import { LocalStorageService } from '../utils/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class State {
  private key = 'store';
  store = signal<StoreType>(initialState);
  private _localStorageService = inject(LocalStorageService);
  constructor() {
    const localStore = this._localStorageService.getItem<StoreType>(this.key);
    if (localStore) this.store.set(localStore);

    effect(() => {
      this._localStorageService.setItem<StoreType>(this.key, this.store());
    });
  }
}

export interface StoreType {
  loading: boolean;
  error: string;
  todos: Todos[];
  posts: Post[];
  memes: Meme[];
}

export const initialState: StoreType = {
  loading: false,
  error: '',
  todos: [],
  posts: [],
  memes: [],
};
