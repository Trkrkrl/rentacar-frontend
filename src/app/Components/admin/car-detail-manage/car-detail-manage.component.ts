import { Component, OnInit } from '@angular/core';
import { FormBuilder , FormGroup,FormControl,Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarDetails } from 'src/app/models/carDetails';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-detail-manage',
  templateUrl: './car-detail-manage.component.html',
  styleUrls: ['./car-detail-manage.component.css']
})
export class CarDetailManageComponent implements OnInit {
  carDetail:CarDetails
  cardetails:CarDetails[] = [];
  
  brands: Brand[] = [];
  brand: Brand;
  
  colors: Color[] = [];
  color: Color;
  
  car: Car;
  
  //htmldeki form nesneleri
  colorUpdateForm: FormGroup;
  brandUpdateForm: FormGroup;
  carUpdateForm: FormGroup;

  

  constructor(private carService: CarService,
    private brandService: BrandService,
    private colorService: ColorService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getColors();
    this.getBrands();
    this.getCarDetails();
    
    this.createColorUpdateForm();
    this.createBrandUpdateForm();
    this.createCarforUpdateForm();
  }
 

  getCarDetails() {
    this.carService.getCars().subscribe((response) => {
      this.cardetails = response.data;
      
    });
  }
  getCarDetailByCarId(carId: number) {
    this.carService.getCarsDetailsByCarId(carId).subscribe((response) => {
      this.carDetail = response.data[0];
    });
  }
  //----------------brand
  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }
  getBrandById(brandId: number) {//bu yoktu ekleyelim serviceye
    this.brandService.getByBrandId(brandId).subscribe((response) => {
     
      this.brand = response.data;
     
    });
  }

 
  getBrandforUpdate(brand: Brand) {
    this.brand = brand;

    this.brandUpdateForm.patchValue({//htmldeki form nesnelerini unutma
      brandId: this.brand.brandId,
    });
  }
  createBrandUpdateForm() {
    this.brandUpdateForm = this.formBuilder.group({
      brandId: [''],
      brandName: ['', Validators.required],
    });
  }
  updateBrand() {
    if (this.brandUpdateForm.valid) {
      let brandModel = Object.assign({}, this.brandUpdateForm.value);
      console.log(brandModel);
      this.brandService.updateBrand(brandModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'güncellendi');
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          
        },
        (responseError) => {
          this.toastrService.error('güncellenemedi');
        }
      );
    }
  }

  removeBrand(brand: Brand) {
    console.log(brand);

    this.brandService.deleteBrand(brand).subscribe(
      (response) => {
        this.toastrService.success('gitti');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        
      },
      (responseError) => {
        this.toastrService.error(responseError.errors, 'Marka silinemedi');
      }
    );
  }
  //-color methodlari ve araçlari
  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
      
    });
  }
  getColor(color: Color) {
    this.color = color;
    this.colorUpdateForm.patchValue({
      colorId: this.color.colorId,
    });
  }
  createColorUpdateForm() {
    this.colorUpdateForm = this.formBuilder.group({
      colorId: [''],
      colorName: ['', Validators.required],
    });
  }

  updateColor() {
    if (this.colorUpdateForm.valid) {
      let colorModel = Object.assign({}, this.colorUpdateForm.value);
   
      this.colorService.updateColor(colorModel).subscribe(
        (response) => {
          
          this.toastrService.success(response.message, 'güncellendi');
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          
        },
        (responseError) => {
          this.toastrService.error('güncellenemedi');
        }
      );
    }
  }

  removeColor(color: Color) {
    this.colorService.deleteColor(color).subscribe(
      (response) => {
        this.toastrService.success('silindi');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        
      },
      (responseError) => {
        this.toastrService.error(responseError.errors, 'renk silinemedi');
      }
    );
  }
  //----car methodlari
  getCarUpdate(car:CarDetails){//buradaki car html de cardetails türünde olduğunu söylemişiz
    this.carDetail =car;
    this.carUpdateForm.patchValue({
      carId:this.carDetail.carId,
      brandId:this.carDetail.brandId,
      colorId:this.carDetail.colorId
    })
  }

  createCarforUpdateForm(){
    this.carUpdateForm = this.formBuilder.group({
     carId:[''],
     brandId:[''],
     colorId:[''],
     carName:['',Validators.required],
     modelYear:['',Validators.required],
     dailyPrice:['',Validators.required],
     description:['',Validators.required],
     findeks:['',Validators.required]
    })
  }

  updateCar(){
    if(this.carUpdateForm.valid){
      let carModel = Object.assign({},this.carUpdateForm.value);
     
       this.carService.updateCar(carModel).subscribe(response=>{
        
         this.toastrService.success(response.message,"güncellendi");
         setTimeout(() => {
          window.location.reload();
        }, 1000);
         
       },responseError=>{
         this.toastrService.error("güncellenmedi");
       }
       )
    }
  }

  //bunun yapısından şüpheliyim

  removeCar(car: CarDetails) {
    this.carService.deleteCar(car).subscribe(
      (response) => {
        this.toastrService.success('silindi');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        
      },
      (responseError) => {
        this.toastrService.error(responseError.errors, 'Arac silinemedi');
      }
    );
  }
  

}
