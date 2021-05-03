import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PackagingLine } from '../../models/packagingline';
import { UserService } from '../../services/user.service';
import { PackagingLineService } from '../../services/packagingLine.service';

@Component({
  selector: 'app-packaging-line-new',
  templateUrl: '../packaging-line-new/packaging-line-new.component.html',
  styleUrls: ['../packaging-line-new/packaging-line-new.component.css'],
  providers: [UserService, PackagingLineService]
})
export class PackagingLineEditComponent implements OnInit {
  public page_title: string;
  public packaging_line : PackagingLine;
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
    private _packagingLineService: PackagingLineService
  ) { 
    this.page_title = "Editar línea de envasado";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.packaging_line = new PackagingLine(1, '', '');
  }

  ngOnInit(){
    this.getPackagingLine();
  }

  onSubmit(form){
    this._packagingLineService.update(this.token, this.packaging_line, this.packaging_line.id).subscribe(
      response => {
        if(response.status == 'success'){
          this.status = 'success';
          this._router.navigate(['/linea-envasado/', this.packaging_line.id]);
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
