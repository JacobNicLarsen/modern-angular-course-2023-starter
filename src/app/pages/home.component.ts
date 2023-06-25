import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { State } from '../store';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="mt-10 text-center">
    <p class="text-xl font-semibold mb-3">Home Works:</p>
    <div class="text-lg">Todos Left: {{ store().todos.length }}</div>
    <div class="text-lg">Posts: {{ store().posts.length }}</div>
  </div>`,
  styles: [],
})
export class HomeComponent {
  private _stateStore = inject(State);
  store = this._stateStore.store;
}
