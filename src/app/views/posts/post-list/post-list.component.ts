import { Component, OnInit } from '@angular/core';
import { PostsService } from './../../../shared/services/posts.service';
import { ToastrService } from 'ngx-toastr';
import { Post } from '../post';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  constructor(
    private _PostsService: PostsService,
    private _ToastrService: ToastrService
  ) {}

  // posts attay
  posts: Post[] = [];

  ngOnInit(): void {
    this.getAll();
  }

  //Get All Posts
  getAll(): void {
    this._PostsService.getAll().subscribe({
      next: (response) => {
        this.posts = response;
      },
    });
  }

  //delete Item
  deleteItem(id: any, index: number): void {
    this._PostsService.deletePost(id).subscribe({
      next: (response) => {
        console.log(response);
        this._ToastrService.success('Item Deleted Successfuly', 'Success', {
          closeButton: true,
          progressBar: true,
          timeOut: 3000,
        });

        this.posts.splice(index, 1);
      },
      error: (err) => {
        console.log(err);

        this._ToastrService.error(err.statusText, 'Error!', {
          closeButton: true,
          progressBar: true,
          timeOut: 3000,
        });
      },
    });
  }

  // delete all
  deleteAllItem(): void {
    this.posts = [];
  }
}
