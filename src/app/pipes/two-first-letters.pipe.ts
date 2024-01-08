import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'twoFirstLetters',
  standalone: true
})
export class TwoFirstLettersPipe implements PipeTransform {

  transform(value: string): string {
    if(!value) return '';
    const words = value.split(' ');

    if(words.length === 1) return words[0].substring(0, 2);

    const firstLetters = words.map(word => word.charAt(0)).join('');

    return firstLetters.substring(0, 2);
  }

}
