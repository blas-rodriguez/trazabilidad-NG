import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Carrier } from '../../models/carrier';
import { UserService } from '../../services/user.service';
import { CarrierService } from '../../services/carrier.service';

@Component({
  selector: 'app-carrier-new',
  templateUrl: './carrier-new.component.html',
  styleUrls: ['./carrier-new.component.css'],
  providers: [UserService, CarrierService]
})
export class CarrierNewComponent implements OnInit {
  public page_title: string;
  public carrier: Carrier;
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
    this.page_title = "Crear transportista";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.carrier = new Carrier(1, '', '');

  }

  ngOnInit(): void {
  }

  onSubmit(form){
    this._carrierService.create(this.token, this.carrier).subscribe(
      response => {
        if(response.status == 'success'){
          this.carrier = response.carrier;
          this.status = 'success';

          this._router.navigate(['/gestion-transportistas']);
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
}
