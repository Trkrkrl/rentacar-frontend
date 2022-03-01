import { Pipe, PipeTransform } from '@angular/core';
import { CarDetails } from '../models/carDetails';

@Pipe({
  name: 'carFilter'
})
export class CarFilterPipe implements PipeTransform {

  transform(value: CarDetails[] , carDetailFilter:string): CarDetails[] {
    carDetailFilter=carDetailFilter?carDetailFilter.toLocaleLowerCase():""

    return carDetailFilter?value.filter((cd:CarDetails)=>
    cd.brandName.toLocaleLowerCase().indexOf(carDetailFilter)!==-1 ||
    cd.modelName.toLocaleLowerCase().indexOf(carDetailFilter)!==-1 ||
    cd.modelYear.toLocaleLowerCase().indexOf(carDetailFilter)!==-1 ||
    cd.colorName.toLocaleLowerCase().indexOf(carDetailFilter)!==-1 ||
    cd.description.toString().indexOf(carDetailFilter)!==-1 ||//farklı bir veri dönücek olabilir o yüzden convert tostring
    cd.dailyPrice.toString().indexOf(carDetailFilter)!==-1 ):value;
  }
  //ekranın yukarısında bir arama text ile arama yaparımdedim ama olmadı

}
