import { Component, inject } from '@angular/core';
import { Getters, State } from 'src/app/store';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `<footer
    class="flex flex-col items-center justify-center p-6 bg-white shadow-inner text-blue-500"
  >
    <pre class="mb-2">
todos: {{ store().todos.length }} | posts: {{ store().posts.length }}</pre
    >
    <pre>total: {{ total() }}</pre>
  </footer>`,
})
export class FooterComponent {
  private _stateStore = inject(State);
  store = this._stateStore.store;
  private _getterService = inject(Getters);
  total = this._getterService.totalObjects;
}
