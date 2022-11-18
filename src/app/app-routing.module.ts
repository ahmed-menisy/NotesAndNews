import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLog, AuthLoginAdmin, AuthLoginUser } from './guards/auth.guard';
import { AdminLayoutComponent } from './shared/componets/layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './shared/componets/layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './shared/componets/layouts/blank-layout/blank-layout.component';
import { UserLayoutComponent } from './shared/componets/layouts/user-layout/user-layout.component';

const routes: Routes = [
  // Blank
  {
    path: '',
    component: BlankLayoutComponent,
    title: 'BLANK',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./views/pages/pages.module').then((m) => m.PagesModule),
      },
    ],
  },

  // user
  {
    path: 'user',
    component: UserLayoutComponent,
    title: 'USER',
    canActivate: [AuthLoginUser],
    children: [
      { path: '', redirectTo: 'notes', pathMatch: 'full' },
      {
        path: 'notes',
        loadChildren: () =>
          import('./views/notes/notes.module').then((m) => m.NotesModule),
      },
      {
        path: 'news',
        loadChildren: () =>
          import('./views/news/news.module').then((m) => m.NewsModule),
      },
    ],
  },

  // admin
  {
    path: 'admin',
    component: AdminLayoutComponent,
    title: 'ADMIN',
    canActivate: [AuthLoginAdmin],

    children: [
      {
        path: '',
        loadChildren: () =>
          import('./views/posts/posts.module').then((m) => m.PostsModule),
      },
    ],
  },

  // auth
  {
    path: 'auth',
    component: AuthLayoutComponent,
    title: 'AUTH',
    canActivate: [AuthLog],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./views/auth/auth.module').then((m) => m.AuthModule),
      },
    ],
  },

  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
