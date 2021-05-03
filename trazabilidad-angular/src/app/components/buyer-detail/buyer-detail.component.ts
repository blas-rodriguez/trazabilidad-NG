import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Buyer } from '../../models/buyer';
import { BuyerService } from '../../services/buyer.service';

@Component({
  selector: 'app-buyer-detail',
  templateUrl: './buyer-detail.component.html',
  styleUrls: ['./buyer-detail.component.css'],
  providers: [BuyerService]
})
export class BuyerDetailComponent implements OnInit {
  public buyer: Buyer;

  constructor(
    private _buyerService: BuyerService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(){
    this.getBuyer();
  }

  getBuyer(){
    //Sacar el id
    this._route.params.subscribe(params => {
      let id = +params['id'];

      //Petición AJAX
      this._buyerService.getBuyer(id).subscribe(
        response => {
          if(response.status == 'success'){
            this.buyer = response.buyer;
          }else{
            this._router.navigate(['/gestion-compradores']);
          }
        },
        error =>{
          console.log(<any>error);
          this._router.navigate(['/gestion-compradores']);
        }
      );
    });
  }

}
