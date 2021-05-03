import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PackagingLine } from '../../models/packagingline';
import { PackagingLineService } from '../../services/packagingLine.service';

@Component({
  selector: 'app-packaging-line-detail',
  templateUrl: './packaging-line-detail.component.html',
  styleUrls: ['./packaging-line-detail.component.css'],
  providers: [PackagingLineService]
})
export class PackagingLineDetailComponent implements OnInit {
  public packaging_line: PackagingLine

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _packagingLineService: PackagingLineService
  ) { }

  ngOnInit(){
    this.getPackagingLine();
  }

  getPackagingLine(){
    //Sacar el id
    this._route.params.subscribe(params => {
      let id = +params['id'];

      //Petición AJAX
      this._packagingLineService.getPackagingLine(id).subscribe(
        response => {
          if(response.status == 'success'){
            this.packaging_line = response.packaging_line;
          }else{
            this._router.navigate(['/gestion-lineas-envasado']);
          }
        },
        error => {
          console.log(<any>error);
          this._router.navigate(['/gestion-lineas-envasado']);
        }
      );
    });
  }

}
