import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'nonEnglish'
})
export class NonEnglishPipe implements PipeTransform{
  transform(value: string): string{
    const newVal = value.replace(/[^\w\s]/gi, '');
    return newVal;

  }

}
