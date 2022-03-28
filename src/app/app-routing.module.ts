//adminler
import { BrandAddComponent } from './Components/admin/add/brand-add/brand-add.component';
import { CarAddComponent } from './Components/admin/add/car-add/car-add.component';
import { ColorAddComponent } from './Components/admin/add/color-add/color-add.component';
import { CarDetailManageComponent } from './Components/admin/car-detail-manage/car-detail-manage.component';


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from './Components/car/car.component';
import { CardetailComponent } from './Components/cardetail/cardetail.component';
import { PaymentComponent } from './Components/payment/payment.component';
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
  {path:"cars/color/:colorId/brand/:brandId",component:CarComponent},//burada hangisi sırayla giriyorsa onu yaz brand-color
  {path:"cars/cardetail/:carId",component:CardetailComponent},
  {path:"cardetails/payment",component:PaymentComponent},

  //adminler-sonra adin guard eklenecek
  {path:"admin/brands/add",component:BrandAddComponent}, //,canActivate:[AdminGuard]
  {path:"admin/colors/add",component:ColorAddComponent},// ,canActivate:[AdminGuard]
  {path:"admin/cars/add",component:CarAddComponent},// ,canActivate:[AdminGuard]
  {path:"admin/cardetails",component:CarDetailManageComponent},//,canActivate:[AdminGuard] 
  //{path:"admin/user",component:UserComponent,canActivate:[LoginGuard]},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
