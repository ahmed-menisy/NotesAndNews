import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NotesRoutingModule } from './notes-routing.module';
import { NoteListComponent } from './note-list/note-list.component';
import { SearchPipe } from 'src/app/pipes/search.pipe';
import { TruncPipe } from 'src/app/pipes/trunc.pipe';

@NgModule({
  declarations: [NoteListComponent, SearchPipe, TruncPipe],
  imports: [
    CommonModule,
    NotesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot(),
  ],
  exports: [SearchPipe, TruncPipe],
})
export class NotesModule {}
