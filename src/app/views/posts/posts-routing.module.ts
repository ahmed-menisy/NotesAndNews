import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostAddComponent } from './post-add/post-add.component';
import { PostEditComponent } from './post-edit/post-edit.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostShowComponent } from './post-show/post-show.component';

const routes: Routes = [
  { path: '', redirectTo: 'posts', pathMatch: 'full' },
  { path: 'posts', component: PostListComponent, title: 'NoteList' },
  { path: 'edit/:id', component: PostEditComponent, title: 'NoteList' },
  { path: 'show/:id', component: PostShowComponent, title: 'NoteList' },
  { path: 'add', component: PostAddComponent, title: 'NoteList' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {}
