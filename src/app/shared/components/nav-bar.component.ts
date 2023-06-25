import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { State } from 'src/app/store/state';
import { SharedModule } from '../shared.module';
import { MenuComponent } from './menu.component';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  template: `<nav
    class="flex items-center justify-between p-6 bg-white bg-opacity-20 shadow-lg backdrop-blur-lg"
  >
    <app-menu
      label="To do"
      [counter]="store().todos.length"
      (handleClick)="to('todos')"
      class="text-lg text-white px-3 py-2 hover:bg-purple-500 hover:text-white hover:bg-opacity-30 hover:shadow-lg"
    ></app-menu>

    <div class="flex space-x-4">
      <app-menu
        label="Posts"
        [counter]="store().posts.length"
        (handleClick)="to('posts')"
        class="text-lg text-white px-3 py-2 hover:bg-purple-500 hover:text-white hover:bg-opacity-30 hover:shadow-lg"
      ></app-menu>

      <app-menu
        label="Memes"
        [counter]="store().memes.length"
        (handleClick)="to('memes')"
        class="text-lg text-white px-3 py-2 hover:bg-purple-500 hover:text-white hover:bg-opacity-30 hover:shadow-lg"
      ></app-menu>
    </div>
  </nav>`,
  imports: [SharedModule, MenuComponent],
})
export class NavBarComponent {
  stateStore = inject(State);
  store = this.stateStore.store;

  private _router = inject(Router);

  async to(url: string) {
    await this._router.navigateByUrl(url);
  }
}
