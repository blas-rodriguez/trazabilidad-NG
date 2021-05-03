import { Component, OnInit } from '@angular/core';
import { Carrier } from '../../models/carrier';
import { UserService } from '../../services/user.service';
import { CarrierService } from '../../services/carrier.service';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-carrier',
  templateUrl: './carrier.component.html',
  styleUrls: ['./carrier.component.css'],
  providers: [UserService, CarrierService]
})
export class CarrierComponent implements OnInit {
  public page_title: string;
  public carriers;
  public identity;
  public token;
  public status: string;
  public page: number;

  constructor(
    private _userService: UserService,
    private _carrierService: CarrierService
  ) { 
    this.page_title = " Gestión de transportistas";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(){
    this.getCarriers();
  }

  getCarriers(){
    this._carrierService.getCarriers().subscribe(
      response => {
        if(response.status == 'success'){
          this.carriers = response.carriers;
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  deleteCarrier(id){
    this._carrierService.delete(this.token, id).subscribe(
      response =>{
        this.getCarriers();
      },
      error =>{
        console.log(<any>error);
      }
    );
  }

}
