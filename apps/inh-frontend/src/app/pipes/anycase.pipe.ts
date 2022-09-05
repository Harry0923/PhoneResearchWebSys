import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'anycase'
})
export class AnycasePipe implements PipeTransform {

  /**
   *
   * @param value : 代入值
   * @param setStr : 空值(指定)狀態, 要統一變成的值
   * @returns
   */
  transform(value: string, setStr: string): string {

    if (value == '') {
      value = setStr;
    }

    return value;
  }

}
