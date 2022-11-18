import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from './../../posts/post';
import { PostsService } from './../../../shared/services/posts.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss'],
})
export class NewsListComponent implements OnInit, OnDestroy {
  constructor(private _PostsService: PostsService) {}

  newsList: Post[] = [];

  refresh: any;

  ngOnInit(): void {
    this.getAll();
  }

  ngOnDestroy(): void {
    clearTimeout(this.refresh);
  }

  getAll(): void {
    this._PostsService.getAll().subscribe({
      next: (response) => {
        this.newsList = response;
        console.log(response);
      },
    });

    this.refresh = setTimeout(() => {
      this.getAll();
    }, 1000);
  }
}
