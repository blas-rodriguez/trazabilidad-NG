import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Estate } from '../../models/estate';
import { EstateService } from '../../services/estate.service';

@Component({
  selector: 'app-estate-detail',
  templateUrl: './estate-detail.component.html',
  styleUrls: ['./estate-detail.component.css'],
  providers: [EstateService]
})
export class EstateDetailComponent implements OnInit {
  public estate: Estate;

  constructor(
    private _estateService: EstateService,
    public _route: ActivatedRoute,
    public _router: Router,
  ) { }

  ngOnInit(){
    this.getEstate();
  }

  getEstate(){
    //Sacar id
    this._route.params.subscribe(params => {
      let id = +params['id'];

      //Petición AJAX
      this._estateService.getEstate(id).subscribe(
        response => {
          if(response.status == 'success'){
            this.estate = response.estate;
          }else{
            this._router.navigate(['/gestion-fincas']);
          }
        },
        error => {
          console.log(<any>error);
          this._router.navigate(['/gestion-fincas']);
        }
      );
    });
  }

}
