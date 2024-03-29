import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Notebook } from '../../models/notebook';
import { UserService } from '../../services/user.service';
import { NotebookService } from '../../services/notebook.service';
import { EstateService } from '../../services/estate.service';
import { FarmerService } from '../../services/farmer.service';

@Component({
  selector: 'app-notebook-edit',
  templateUrl: '../notebook-new/notebook-new.component.html',
  styleUrls: ['../notebook-new/notebook-new.component.css'],
  providers: [UserService, NotebookService, EstateService, FarmerService]
})
export class NotebookEditComponent implements OnInit {
  public page_title: string;
  public notebook: Notebook;
  public estates;
  public farmers;
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
    private _notebookService: NotebookService,
    private _estateService: EstateService,
    private _farmerService: FarmerService
  ) { 
    this.page_title = "Crear cuaderno de campo";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.notebook = new Notebook(1, 1, 1, '');
  }

  ngOnInit(){
    this.getNotebook();
    this.getEstates();
    this.getFarmers();
  }

  onSubmit(form){
    this._notebookService.update(this.token, this.notebook, this.notebook.id).subscribe(
      response => {
        if(response.status == 'success'){
          this.status = 'success';
          this._router.navigate(['/cuaderno-campo', this.notebook.id]);
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

  getNotebook(){
    //Sacar el id
    this._route.params.subscribe(params => {
      let id = +params['id'];

      //Petición AJAX
      this._notebookService.getNotebook(id).subscribe(
        response => {
          if(response.status == 'success'){
            this.notebook = response.notebook;
          }else{
            this._router.navigate(['/gestion-cuaderno-campo']);
          }
        },
        error => {
          console.log(<any>error);
          this._router.navigate(['/gestion-cuaderno-campo']);
        }
      );
    });
  }

  getEstates(){
    this._estateService.getEstates().subscribe(
      response => {
        if(response.status == 'success'){
          this.estates = response.estates;
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  getFarmers(){
    this._farmerService.getFarmers().subscribe(
      response => {
        if(response.status == 'success'){
          this.farmers = response.farmers;
        }
      },
      error =>{
        console.log(<any>error);
      }
    );
  }

}
