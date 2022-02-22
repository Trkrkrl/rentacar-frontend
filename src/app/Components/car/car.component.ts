import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import { CarDetails } from 'src/app/models/carDetails';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  //car nesnesini ekle sagida get metodunda gelecek dataya esitle
cars:CarDetails[] = [];
dataLoaded: boolean = false;


  constructor(private carService: CarService,
private activatedRoute: ActivatedRoute,

    ) { }



  ngOnInit(): void {
    
    //burada if else yapisiyla belli olacak calisacak kod
    //gelen veri icerisindeki parametreyi ayirt edebilmeliyiz ,
    //yani dinamik bir şekilde bu yönlendirici (router) parametreyi kullanabilmeliyiz:params[""]
    // kullanacagiz, params kullanabilmek için 
    //extract a parameter using 'activatedRoute'
    //bunu da ctor ' a eklemeliyiz bir nevi servicesi var
    //ngonit icerisine yazdigin koldari disaridada (asagida)cagir yoksa kiizar

    

    this.activatedRoute.params.subscribe(params => {

      if(params["brandId"]&&params["colorId"]){
        
        this.getCarsDetailByBrandAndColorId(params["brandId"],params["colorId"])
      
      }else if(params["brandId"]){
        this.getCarsByBrandId(params["brandId"])
      
      }else if(params["colorId"]){
        this.getCarsByColorId(params["colorId"])
      
      }else{
        this.getCars();
      }





    })
  }
  
  //------------ngonit icerisindeki kodlari cagir
  getCars() {
    this.carService.getCars().subscribe(response=>{
      this.cars=response.data;
      this.dataLoaded= true;
    })

  }

  getCarsDetailByBrandAndColorId(brandId:number, colorId:number) {
    this.carService.getCarsDetailByBrandAndColorId(brandId, colorId).subscribe(response=>{
      console.log(response)
      this.cars=response.data;
      this.dataLoaded= true;

      
    })

  }

  getCarsByBrandId(brandId:number) {
    this.carService.getCarsByBrandId(brandId).subscribe(response=>{
      this.cars=response.data;
      this.dataLoaded= true;

      
    })

  }
  getCarsByColorId(colorId:number) {
    this.carService.getCarsByColorId(colorId).subscribe(response=>{
      this.cars=response.data;
      this.dataLoaded= true;

      
    })

  }


}
