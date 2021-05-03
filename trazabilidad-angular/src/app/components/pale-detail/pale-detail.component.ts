import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params } from '@angular/router';
import { Pale } from '../../models/pale';
import { PaleService } from '../../services/pale.service';

@Component({
  selector: 'app-pale-detail',
  templateUrl: './pale-detail.component.html',
  styleUrls: ['./pale-detail.component.css'],
  providers: [PaleService]
})
export class PaleDetailComponent implements OnInit {
  public pale: Pale;

  constructor(
    private _paleService: PaleService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(){
    this.getPale();
  }

  getPale(){
    this._route.params.subscribe(params => {
      let id = +params['id'];

      //Petición AJAX
      this._paleService.getPale(id).subscribe(
        response => {
          if(response.status == 'success'){
            this.pale = response.pale;
          }else{
            this._router.navigate(['/gestion-pales']);
          }
        },
        error => {
          console.log(<any>error);
          this._router.navigate(['/gestion-pales']);
        }
      );
    });
  }

}
