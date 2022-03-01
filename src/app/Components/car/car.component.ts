import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import { CarDetails } from 'src/app/models/carDetails';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarImage } from 'src/app/models/carImage';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  //car nesnesini ekle sagida get metodunda gelecek dataya esitle
carDetails:CarDetails[] = [];
carImage:CarImage[]=[];
colors:Color[]=[];
colorFilter:number=0
brands:Brand[] = [];
brandFilter:number=0
carDetailFilter:string=''



imageUrl:string="https://localhost:44396/Uploads/images/" //burayı doğru yazdığına emin ol


dataLoaded: boolean = false;


  constructor(private carService: CarService,
private activatedRoute: ActivatedRoute,
private brandService: BrandService,//getallbrand methodu için gerekli-o da car htmldeki üsetteki filter için gerekli
private colorService: ColorService//buda brand ile ayni şeklilde


    ) { }



  ngOnInit(): void {
    
    //burada if else yapisiyla belli olacak calisacak kod
    //gelen veri icerisindeki parametreyi ayirt edebilmeliyiz ,
    //yani dinamik bir şekilde bu yönlendirici (router) parametreyi kullanabilmeliyiz:params[""]
    // kullanacagiz, params kullanabilmek için 
    //extract a parameter using 'activatedRoute'
    //bunu da ctor ' a eklemeliyiz bir nevi servicesi var
    //ngonit icerisine yazdigin koldari disaridada (asagida)cagir yoksa kiizar
    //ilk if teki color ve brandid sıraı frontend ve backendde hep ayin olsun
    

    this.activatedRoute.params.subscribe(params => {
      this.getAllBrands();
      this.getAllColors();

      if(params["colorId"]&&params["brandId"]){
        
        this.getCarsDetailByBrandAndColorId(params["colorId"],params["brandId"])
      
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
      this.carDetails=response.data;
      this.dataLoaded= true;
    })

  }

  getCarsDetailByBrandAndColorId( colorId:number,brandId:number) {
    this.carService.getCarsDetailByBrandAndColorId(colorId, brandId).subscribe(response=>{
      console.log(response)
      this.carDetails=response.data;
      this.dataLoaded= true;

      
    })

  }

  getCarsByBrandId(brandId:number) {
    this.carService.getCarsByBrandId(brandId).subscribe(response=>{
      this.carDetails=response.data;
      this.dataLoaded= true;

      
    })

  }
  getCarsByColorId(colorId:number) {
    this.carService.getCarsByColorId(colorId).subscribe(response=>{
      this.carDetails=response.data;
      this.dataLoaded= true;

      
    })

  }
//bu get selected ler ekranın yukarıındaki seçmeli yerler için
  getSelectedColor(colorId: number){
    if(this.colorFilter==colorId) return true;
    else return false; 
  }
  getSelectedBrand(brandId: number){
    if(this.brandFilter==brandId) return true;
    else return false; 
  }
 
  getAllColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
      console.log(this.colors);
    });
  }

  getAllBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
      console.log(this.brands);
    });
  }
 



}
