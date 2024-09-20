import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimVideoName',
})
export class TrimVideoNamePipe implements PipeTransform {
  private readonly maxLength = 40;
  private readonly trimLength = 36;

  transform(name: string): string {
    return name.length > this.maxLength
      ? `${name.slice(0, this.trimLength)}...`
      : name;
  }
}
