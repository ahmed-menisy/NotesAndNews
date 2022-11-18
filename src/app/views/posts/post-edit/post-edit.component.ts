import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from './../../../shared/services/posts.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss'],
})
export class PostEditComponent implements OnInit {
  constructor(
    private _PostsService: PostsService,
    private _ActivatedRoute: ActivatedRoute,
    private _ToastrService: ToastrService,
    private _Router: Router
  ) {}

  updateForm: FormGroup = new FormGroup({
    title: new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(500),
    ]),
    description: new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(500),
    ]),
  });
  curentId: number = this._ActivatedRoute.snapshot.params['id'];

  ngOnInit() {
    this.buildupdateForm();
  }

  //build update form
  buildupdateForm(): void {
    // let curentPost!: Post;
    this._PostsService.getItem(this.curentId).subscribe((response) => {
      this.f['title'].setValue(response.title);
      this.f['description'].setValue(response.description);
    });
  }

  // update post
  update(data: FormGroup): void {
    this._PostsService.update(this.curentId, data.value).subscribe({
      next: (response) => {
        console.log(response);
        this._ToastrService.success('Item Update Successfuly', 'Success', {
          closeButton: true,
          progressBar: true,
          timeOut: 3000,
        });

        this._Router.navigate(['/admin/posts']);
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

  //get controls
  public get f(): any {
    return this.updateForm.controls;
  }
}
