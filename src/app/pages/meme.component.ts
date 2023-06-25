import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Actions } from '../store/actions';
import { State } from '../store/state';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Meme } from '../modules';

@UntilDestroy()
@Component({
  selector: 'app-meme',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `<div
    class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-blue-500 text-white"
  >
    <div class="w-full max-w-2xl p-6">
      <h1 class="text-2xl font-bold mb-5 text-center">Meme Page</h1>
      <div class="mt-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="search"
          >Search:</label
        >
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="search"
          type="text"
          [(ngModel)]="searchQuery"
          (keyup)="filterMemes()"
          placeholder="Type here..."
        />
      </div>
      <div class="flex justify-between px-6 py-4">
        <div class="w-24 h-12">
          <button
            *ngIf="currentIndex > 0"
            (click)="handlePreviousClick()"
            class="w-full h-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
          >
            Previous
          </button>
        </div>
        <div class="w-24 h-12">
          <button
            *ngIf="currentIndex < store().memes.length - 3"
            (click)="handleNextClick()"
            class="w-full h-full bg-purple-500 text-white font-bold py-2 px-4 rounded hover:bg-purple-700"
          >
            next
          </button>
        </div>
      </div>
      <ul class="space-y-4">
        <li
          class="bg-white shadow-lg rounded-md p-6 flex items-start space-x-6"
          *ngFor="
            let meme of filteredMemes
              ? (filteredMemes | slice : currentIndex : currentIndex + 3)
              : (store().memes | slice : currentIndex : currentIndex + 3)
          "
        >
          <div
            (click)="handleImageClicked(meme.id)"
            class="flex-shrink-0 w-32 h-32 relative"
          >
            <div>
              <img
                class="absolute top-0 left-0 object-cover h-full w-full rounded-md"
                src="{{ meme.url }}"
                alt="{{ meme.name }}"
                onError="this.onerror=null;this.src='/path/to/fallback/image.png';"
              />
            </div>
          </div>
          <span class="ml-4 text-purple-700 font-semibold text-lg">{{
            meme.name
          }}</span>
        </li>
      </ul>
    </div>
  </div>`,
  styles: [],
})
export class MemeComponent implements OnInit {
  constructor(
    private _stateStore: State,
    private _stateActions: Actions,
    private _router: Router
  ) {}

  searchQuery = '';
  filteredMemes: Meme[] | null = null;

  store = this._stateStore.store;
  currentIndex = 0;
  searchMemes: Meme[] = [];

  async ngOnInit() {
    await this._stateActions.fetchMemes();
  }

  handleNextClick() {
    if (this.currentIndex < this.store().memes.length - 3) {
      this.currentIndex += 3;
    }
  }
  handlePreviousClick() {
    if (this.currentIndex > 0) {
      this.currentIndex -= 3;
    }
  }

  handleImageClicked(id: string) {
    this._router.navigateByUrl(`memes/generate/${id}`);
  }

  filterMemes() {
    this.currentIndex = 0;
    if (this.searchQuery === '' || this.searchQuery === null) {
      this.filteredMemes = null;
      return;
    }
    this.filteredMemes = this.store().memes.filter((meme) =>
      meme.name.includes(this.searchQuery)
    );
    console.log(this.filteredMemes);
  }
}
