import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Carrier } from '../../models/carrier';
import { UserService } from '../../services/user.service';
import { CarrierService } from '../../services/carrier.service';

@Component({
  selector: 'app-carrier-edit',
  templateUrl: '../carrier-new/carrier-new.component.html',
  styleUrls: ['../carrier-new/carrier-new.component.css'],
  providers: [UserService, CarrierService]
})
export class CarrierEditComponent implements OnInit {
  public page_title: string;
  public carrier : Carrier;
  public identity;
  public token;
  public status: string;
  public froala_options: Object ={
    charCounterCount:true,
    language: 'es',
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
  };

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _carrierService: CarrierService
  ) { 
    this.page_title = "Editar comprador";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.carrier = new Carrier(1, '', '');
  }

  ngOnInit(){
    this.getCarrier();
  }

  onSubmit(form){
    this._carrierService.update(this.token, this.carrier, this.carrier.id).subscribe(
      response => {
        if(response.status == 'success'){
          this.status = 'success';
          this._router.navigate(['/transportista', this.carrier.id]);
        }else{
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';
        console.log(<any>error);
      }
    );
  }

  getCarrier(){
    //Sacar el id
    this._route.params.subscribe(params => {
      let id = +params['id'];

      //Petición AJAX
      this._carrierService.getCarrier(id).subscribe(
        response => {
          if(response.status == 'success'){
            this.carrier = response.carrier;
          }else{
            this._router.navigate(['/gestion-transportistas']);
          }
        },
        error => {
          console.log(<any>error);
          this._router.navigate(['/gestion-transportistas']);
        }
      );
    });
  }

}
