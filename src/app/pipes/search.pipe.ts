import { Pipe, PipeTransform } from '@angular/core';
import { Post } from '../views/posts/post';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(arr: Post[], trim: string): Post[] {
    return arr.filter((data) =>
      data.title.toLowerCase().includes(trim.toLowerCase())
    );
  }
}
