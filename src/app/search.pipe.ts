import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'appFilter' })
export class SearchPipe implements PipeTransform {
  transform(items: any[], searchText): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter(it => {
      console.log(it);
      return it.name.toLocaleLowerCase().includes(searchText);
    });
  }
}
