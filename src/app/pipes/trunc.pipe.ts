import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trunc',
})
export class TruncPipe implements PipeTransform {
  transform(text: string, limit: number): string {
    return text.split(' ', limit).join(' ');
  }
}
