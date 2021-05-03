import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Carrier } from '../../models/carrier';
import { CarrierService } from '../../services/carrier.service';

@Component({
  selector: 'app-carrier-detail',
  templateUrl: './carrier-detail.component.html',
  styleUrls: ['./carrier-detail.component.css'],
  providers: [CarrierService]
})
export class CarrierDetailComponent implements OnInit {
  public carrier: Carrier;

  constructor(
    private _carrierService: CarrierService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit(){
    this.getCarrier();
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
