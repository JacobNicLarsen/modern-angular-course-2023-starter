import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'posts',
    loadComponent: () =>
      import('./pages/posts.component').then((m) => m.PostsComponent),
  },
  {
    path: 'todos',
    loadComponent: () =>
      import('./pages/todos.component').then((m) => m.TodosComponent),
  },
  {
    path: 'memes',
    loadComponent: () =>
      import('./pages/meme.component').then((m) => m.MemeComponent),
  },
  {
    path: 'memes/generate/:id',
    loadComponent: () =>
      import('./pages/generate-meme.component').then(
        (m) => m.GenerateMemeComponent
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
