import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchTranId'
})
export class SearchTranIdPipe implements PipeTransform {

  transform(list: any[], searchTerm:string): any[] {

   
    if(!list || !searchTerm){
      return list;
    }
    else{
      return list.filter(listObj=>listObj[0].toLowerCase().indexOf(searchTerm.toLowerCase())!==-1 )
    }

}
}
