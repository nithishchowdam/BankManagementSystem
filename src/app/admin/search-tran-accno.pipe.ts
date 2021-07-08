import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchTranAccno'
})
export class SearchTranAccnoPipe implements PipeTransform {

  transform(list:any[],accno:string):any[] {
    if(!accno || !list)
    return list;
    else{
       return list.filter(listObj=>listObj[2].toString().indexOf(accno)!==-1 )
    }
  }
}
