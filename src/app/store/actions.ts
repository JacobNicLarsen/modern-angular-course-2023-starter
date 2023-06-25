import { Injectable, effect, inject } from '@angular/core';
import { State } from './state';
import { HttpService } from '../services/http.service';
import { MemeResponse, Post as Post, Todos } from '../modules';
import { EndPoints, memeEndpoints } from '../configs/axios.configs';
import { LocalStorageService } from '../utils/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class Actions {
  private key = 'store';
  private _stateStore = inject(State);
  private _httpService = inject(HttpService);
  private _localStorageService = inject(LocalStorageService);
  // with side effects because thsi is with async call

  constructor() {
    effect(() => {
      this._localStorageService.setItem(this.key, this._stateStore.store());
    });
  }

  async fetchTodos() {
    this.endableLoading();
    try {
      const { data } = await this._httpService.get<Todos[]>(EndPoints.todos);
      this._stateStore.store.mutate((store) => (store.todos = data));
    } catch (error: any) {
      this.setError(error.message);
    }
    this.disableLoading();
  }

  async fetchPosts() {
    this.endableLoading();
    try {
      const { data } = await this._httpService.get<Post[]>(EndPoints.posts);
      this._stateStore.store.mutate((store) => (store.posts = data));
    } catch (error: any) {
      this.setError(error.message);
    }
    this.disableLoading();
  }

  removeTodoByIndex(index: number) {
    this._stateStore.store.mutate((store) => {
      store.todos.splice(index, 1);
    });
  }

  async createPost(post: Post) {
    this.endableLoading();
    try {
      const { data } = await this._httpService.post<Post>(
        EndPoints.posts,
        post
      );
      this._stateStore.store.mutate((store) => {
        store.posts.push(data);
      });
    } catch (error: any) {
      this.setError(error.message);
    }
    this.disableLoading();
  }

  async fetchMemes() {
    this.endableLoading();
    try {
      const { data } = await this._httpService.getMemes<MemeResponse>(
        memeEndpoints.getMemes
      );
      this._stateStore.store.mutate((store) => (store.memes = data.data.memes));
    } catch (error: any) {
      this.setError(error.message);
    }
    this.disableLoading();
  }

  private endableLoading() {
    this._stateStore.store.mutate((store) => {
      store.loading = true;
      store.error = '';
    });
  }

  private disableLoading() {
    this._stateStore.store.mutate((store) => (store.loading = false));
  }

  private setError(error: string) {
    this._stateStore.store.mutate((store) => (store.error = error));
  }
}
