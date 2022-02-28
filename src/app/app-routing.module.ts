import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from './Components/car/car.component';
import { CardetailComponent } from './Components/cardetail/cardetail.component';
//bu const sabitler demek: routes array icerisine yazdiklarin
//buraya ekledigin nesneler{} html in icerisinde ne göstereyim sorusunun cevabıdır
//1. olarak car componentelere path verelim
// boş açıldığında tüm arabalar gelmeli,cars deyince arabalar gelmeli,
//brandıd ve veya color id yi seçince  de ona gore carlar gelmeli

const routes: Routes = [
  {path:"",pathMatch:"full",component:CarComponent},
  {path:"cars",component:CarComponent},
  {path:"cars/brand/:brandId",component:CarComponent},
  {path:"cars/color/:colorId",component:CarComponent},
  {path:"cars/color:colorId/brand/:brandId",component:CarComponent},//burada hangisi sırayla giriyorsa onu yaz brand-color
  {path:"cars/cardetail/:carId",component:CardetailComponent}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
