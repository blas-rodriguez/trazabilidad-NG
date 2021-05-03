import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Farmer } from '../../models/farmer';
import { FarmerService } from '../../services/farmer.service';

@Component({
  selector: 'app-farmer-detail',
  templateUrl: './farmer-detail.component.html',
  styleUrls: ['./farmer-detail.component.css'],
  providers: [FarmerService]
})
export class FarmerDetailComponent implements OnInit {
  public farmer: Farmer;

  constructor(
    private _farmerService: FarmerService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(){
    this.getFarmer();
  }

  getFarmer(){
    this._route.params.subscribe(params => {
      let id = +params['id'];

      //Petición AJAX
      this._farmerService.getFarmer(id).subscribe(
        response => {
          if(response.status == 'success'){
            this.farmer = response.farmer;
          }else{
            this._router.navigate(['/gestion-agricultores']);
          }
        },
        error => {
          console.log(<any>error);
          this._router.navigate(['/gestion-agricultores']);
        }
      );
    });
  }

}
