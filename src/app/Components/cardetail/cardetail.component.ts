import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetails } from 'src/app/models/carDetails';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-cardetail',
  templateUrl: './cardetail.component.html',
  styleUrls: ['./cardetail.component.css']
})
export class CardetailComponent implements OnInit {
  //carDetail:CarDetails[]= [];
  cars: CarDetails[] = [];
  carImagePaths:string[] = [];
  carDetail: CarDetails;
  dataLoaded = false;
  imageUrl:string="https://localhost:44396/Uploads/images/"
  
  carImages:CarImage[]=[];//slider için

  constructor(private carImageService: CarImageService,
    private carService: CarService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {


    this.activatedRoute.params.subscribe(params => {//car id verilirse ki arabaya tiklayinca verilmis olur: icerdeki emthodlari calistir

      if(params['carId']){
          this.getCarsDetailsByCarId(params['carId'])
         // this.getImagesByCarId(params['carId'])

        }
    })

    
  }
  




  getCarsDetailsByCarId(carId: number){//details sayfamızdaki araç detaylarını çekiyor
    this.carService.getCarsDetailsByCarId(carId).subscribe((response)=>{
      this.cars=response.data
      this.carDetail = response.data[0];//sıfırıncı eement bilgilerin olduğu kısım,sonra mesaj felan geliyor
      
      this.carImagePaths=this.carDetail.imagePath
      this.dataLoaded = true;

    })
  }

 
  
  

}
  



