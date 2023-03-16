import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vowelsToNumber'
})
export class VowelsToNumberPipe implements PipeTransform {

  transform(value: string): string {
    return value
      .replace(/a|A/gi, "4")
      .replace(/e|E/gi, "3")
      .replace(/i|I/gi, "1")
      .replace(/o|O/gi, "0")
      .replace(/u|U/gi, "9");
  }

}
