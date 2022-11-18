import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { PostsService } from './../../../shared/services/posts.service';
import { Post } from './../post';

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.scss'],
})
export class PostAddComponent implements OnInit {
  constructor(
    private _ToastrService: ToastrService,
    private _PostsService: PostsService
  ) {}

  addForm: FormGroup = new FormGroup({
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

  newsPosts: Post[] = [];
  public posts: Post[] = [];

  ngOnInit() {
    this.getAll();
    this.getNews();
  }

  //Get All Posts
  getAll(): void {
    // console.log('sss');
    this._PostsService.getAll().subscribe({
      next: (response) => {
        this.posts = response;
      },
    });
  }

  // add item
  add(addForm: FormGroup): void {
    if (addForm.invalid) return;
    this._PostsService.subjectName.next({ text: 'update' });

    this._PostsService.add(addForm.value).subscribe({
      next: (response) => {
        // this.router.navigate(['/admin/posts']);
        console.log(response);
        this._ToastrService.success('Item Add Successfuly', 'Success', {
          closeButton: true,
          progressBar: true,
          timeOut: 3000,
        });
        this.getAll();
        this.addForm.reset();
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

  //get news
  getNews(): void {
    this._PostsService.getNews().subscribe({
      next: (response) => {
        this.newsPosts = response.articles;
      },
    });
  }

  //checked news
  isChecked(event: any): void {
    // console.log(event.target.value);
    let curentIndex: any;
    const curentChecked = JSON.parse(event.target.value);
    const isFound = this.posts.find((post, index) => {
      if (post['title'] == curentChecked['title']) {
        curentIndex = index;
        return true;
      } else {
        return false;
      }
    });

    if (!isFound) {
      this._PostsService.subjectName.next({ text: 'update' });
      console.log(curentChecked);
      // console.log(isFound);
      this.posts.push(curentChecked);

      console.log('sss');
      this._PostsService.add(curentChecked).subscribe({
        next: (response) => {
          console.log(response);
          this._ToastrService.success('Item Add Successfuly', 'Success', {
            closeButton: true,
            progressBar: true,
            timeOut: 3000,
          });
        },
      });
    } else {
      this.posts.splice(curentIndex, 1);
      this._PostsService.deletePost(curentChecked.id).subscribe({
        next: (response) => {
          console.log(response);
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
  }

  //check to select if found
  check(event: any): boolean {
    const curentChecked = JSON.parse(event.value);
    const isFound = this.posts.some(
      (post) => post['title'] == curentChecked['title']
    );
    return isFound;
  }
}
