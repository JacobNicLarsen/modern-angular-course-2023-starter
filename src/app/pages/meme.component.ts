import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Actions } from '../store/actions';
import { State } from '../store/state';
import { Router } from '@angular/router';
import { EndPoints } from '../configs/axios.configs';

@Component({
  selector: 'app-meme',
  standalone: true,
  imports: [CommonModule],
  template: `<div
    class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-blue-500 text-white"
  >
    <div class="w-full max-w-2xl p-6">
      <h1 class="text-2xl font-bold mb-5 text-center">Meme Page</h1>
      <div class="flex justify-between px-6 py-4">
        <button
          (click)="handlePreviousClick()"
          class="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
        >
          Previous
        </button>
        <button
          (click)="handleNextClick()"
          class="bg-purple-500 text-white font-bold py-2 px-4 rounded hover:bg-purple-700"
        >
          next
        </button>
      </div>
      <ul class="space-y-4">
        <li
          class="bg-white shadow-lg rounded-md p-6 flex items-start space-x-6"
          *ngFor="
            let meme of store().memes | slice : currentIndex : currentIndex + 3
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
  private _stateStore = inject(State);
  private _stateActions = inject(Actions);
  private _router = inject(Router);

  store = this._stateStore.store;
  currentIndex = 0;

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
}
