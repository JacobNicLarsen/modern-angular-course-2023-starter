import { Component, OnInit, inject } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { State } from '../store/state';
import { Actions } from '../store/actions';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [SharedModule],
  template: `
    <div
      class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-blue-500"
    >
      <div class="w-full max-w-2xl p-6">
        <h1 class="text-3xl font-bold mb-5 text-center text-white">
          {{ store().loading ? 'loading...' : 'Todos Works' }}
        </h1>
        <ul class="space-y-4">
          <li
            class="bg-white shadow-lg rounded-md p-6 flex justify-between items-center space-x-6"
            *ngFor="let todo of store().todos; let index = index"
          >
            <span class="text-center flex-shrink-0">{{ todo.title }}</span>
            <button
              (click)="handleToDoById(index)"
              class="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md"
            >
              Delete
            </button>
          </li>
        </ul>
      </div>
    </div>
  `,
  styles: [],
})
export class TodosComponent implements OnInit {
  private _stateStore = inject(State);
  private _stateActions = inject(Actions);

  store = this._stateStore.store;

  async ngOnInit() {
    await this._stateActions.fetchTodos();
  }

  handleToDoById(index: number) {
    this._stateActions.removeTodoByIndex(index);
  }
}
