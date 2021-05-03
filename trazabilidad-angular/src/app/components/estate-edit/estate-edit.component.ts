import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Estate } from '../../models/estate';
import { UserService } from '../../services/user.service';
import { EstateService } from '../../services/estate.service';

@Component({
  selector: 'app-estate-edit',
  templateUrl: '../estate-new/estate-new.component.html',
  styleUrls: ['../estate-new/estate-new.component.css'],
  providers: [UserService, EstateService]
})
export class EstateEditComponent implements OnInit {
  public page_title: string;
  public estate : Estate;
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
    private _estateService: EstateService
  ) { 
    this.page_title = "Editar finca";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.estate = new Estate(1, '', '', '', '', '', '', '');
  }

  ngOnInit(){
    this.getEstate();
  }

  onSubmit(form){
    this._estateService.update(this.token, this.estate, this.estate.id).subscribe(
      response => {
        if(response.status == 'success'){
          this.status = 'success';
          this._router.navigate(['/finca', this.estate.id]);
        }else{
          this.status = 'error';
        }
      },
      error => {
        console.log(<any>error);
        this.status = 'error';
      }
    );
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
