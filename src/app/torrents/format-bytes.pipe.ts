import { Pipe, PipeTransform } from '@angular/core';
import {Utils} from "../qbit/models/utils";

@Pipe({
  name: 'formatBytes'
})
export class FormatBytesPipe implements PipeTransform {

  transform(number: string | number, args?: any): any {
    return Utils.bytesToString(+number);
  }
}
