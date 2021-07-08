import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchAccno'
})
export class SearchAccnoPipe implements PipeTransform {

  transform(list:any[],accno:string):any[] {
    if(!accno || !list)
    return list;
    else{
       return list.filter(listObj=>listObj[6].toString().indexOf(accno)!==-1 )
    }
  }

}
