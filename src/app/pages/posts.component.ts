import { Component, OnInit, inject } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { State, Actions } from '../store';
import { FormBuilder, Validators } from '@angular/forms';
import {
  combineLatestWith,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Post } from '../modules';

@UntilDestroy()
@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [SharedModule],
  template: `<div
    class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-blue-500"
  >
    <div class="w-full max-w-2xl p-6">
      <h1 class="text-3xl font-bold mb-5 text-center text-white">
        {{ store().loading ? 'loading...' : 'Posts Works' }}
      </h1>
      <form [formGroup]="postForm" (ngSubmit)="handleSubmitForm()" class="mb-5">
        <label for="title" class="block text-white text-sm font-bold mb-2"
          >Title</label
        >
        <input
          type="text"
          formControlName="title"
          id="title"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <label for="body" class="block text-white text-sm font-bold mb-2 mt-4"
          >Body</label
        >
        <input
          type="text"
          formControlName="body"
          id="body"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <button
          type="submit"
          class="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md mt-4"
        >
          Submit
        </button>
      </form>
      <ul class="space-y-4">
        <li
          *ngIf="content !== ''"
          class="bg-white shadow-lg rounded-md p-6 flex items-start space-x-6 text-blue-500"
        >
          {{ content }}
        </li>
        <li
          class="bg-white shadow-lg rounded-md p-6 flex items-start space-x-6"
          *ngFor="let post of store().posts.reverse()"
        >
          <span class="text-center flex-shrink-0">{{ post.title }}</span>
        </li>
      </ul>
    </div>
  </div>`,
  styles: [],
})
export class PostsComponent implements OnInit {
  private _stateStore = inject(State);
  private _stateActions = inject(Actions);
  private _formBuilder = inject(FormBuilder);
  store = this._stateStore.store;

  content = '';

  postForm = this._formBuilder.group({
    userId: [0],
    title: ['', Validators.required],
    body: ['', Validators.required],
  });

  async ngOnInit() {
    await this._stateActions.fetchPosts();
    this.watchForm();
  }

  async handleSubmitForm() {
    this.postForm.value.userId = 1;
    await this._stateActions.createPost(this.postForm.value as Post);
    this.postForm.reset();
  }

  private watchForm() {
    const bodyValuesChanges = this.postForm.get('body')?.valueChanges;
    if (bodyValuesChanges) {
      this.postForm
        .get('title')
        ?.valueChanges.pipe(
          debounceTime(1000),
          distinctUntilChanged(),
          combineLatestWith(bodyValuesChanges),
          untilDestroyed(this)
        )
        .subscribe(([title, body]) => {
          if (title && body) this.content = `Title = ${title} Body = ${body}`;
          else this.content = '';
        });
    }
  }
}
