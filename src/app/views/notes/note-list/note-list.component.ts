import { Component, OnInit } from '@angular/core';
import { NotesService } from './../../../shared/services/notes.service';
import { Post } from './../../posts/post';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss'],
})
export class NoteListComponent implements OnInit {
  constructor(
    private _NotesService: NotesService,
    private _ToastrService: ToastrService
  ) {}
  noteForm: FormGroup = new FormGroup({
    title: new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(30),
    ]),
    description: new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(200),
    ]),
  });
  show: boolean = false;
  btnAddOrUpdate: boolean = true;
  notes: Post[] = [];
  curentId: number = 0;
  curentIndex: any = 0;
  trim: string = '';

  ngOnInit(): void {
    this.getAll();
  }

  //Get All
  getAll(): void {
    this._NotesService.getAll().subscribe({
      next: (response) => {
        this.notes = response;
      },
    });
  }

  //close
  close(): void {
    this.show = false;
    this.noteForm.reset();
  }

  //Delete Item
  deleteItem(id: any, index: number): void {
    this._NotesService.deleteNote(id).subscribe({
      next: (response) => {
        this.getAll();
        this._ToastrService.success('Item Add Successfuly', 'Success', {
          closeButton: true,
          progressBar: true,
          timeOut: 3000,
        });
      },
      error: (err) => {
        this._ToastrService.error(err.statusText, 'Error!', {
          closeButton: true,
          progressBar: true,
          timeOut: 3000,
        });
      },
    });
  }

  //edit api
  update(id: number, obj: any): void {
    this._NotesService.update(id, obj).subscribe({
      next: (response) => {
        console.log(response);
        this.getAll();
      },
    });
  }

  // add api
  add(obj: any): void {
    this._NotesService.add(obj).subscribe({
      next: (response) => {
        this.notes.push(obj);
        this._ToastrService.success('Item Add Successfuly', 'Success', {
          closeButton: true,
          progressBar: true,
          timeOut: 3000,
        });
        this.getAll();
      },
      error: (err) => {
        this._ToastrService.error(err.statusText, 'Error!', {
          closeButton: true,
          progressBar: true,
          timeOut: 3000,
        });
      },
    });
  }

  //get Item
  getItem(): void {
    this._NotesService.getItem(this.curentId).subscribe({
      next: (response) => {
        this.noteForm.controls['title'].setValue(response.title);
        this.noteForm.controls['description'].setValue(response.description);
      },
    });
  }

  //Show Add Or Update
  addOrUpdateItem(id: any, btn: boolean, i?: number): void {
    this.curentIndex = i;
    this.curentId = id;
    this.show = true;
    // console.log(id);
    if (btn) {
      // add
      this.btnAddOrUpdate = btn;
    } else {
      this.getItem();
      // update
      this.btnAddOrUpdate = btn;
    }
  }

  // On SubMit Data
  onSubmitForm(formData: FormGroup): void {
    if (formData.invalid) return;
    if (this.btnAddOrUpdate) {
      this.add(formData.value);
      formData.reset();
      this.show = false;
    } else {
      this.update(this.curentId, formData.value);
      formData.reset();
      this.show = false;
    }
  }

  // Track Item
  trackItem(i: number, note: Post): any {
    return i;
  }
}
