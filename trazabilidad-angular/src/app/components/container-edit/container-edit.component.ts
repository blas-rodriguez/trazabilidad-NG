import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Container } from '../../models/container';
import { UserService } from '../../services/user.service';
import { ContainerService } from '../../services/container.service';

@Component({
  selector: 'app-container-edit',
  templateUrl: '../container-new/container-new.component.html',
  styleUrls: ['../container-new/container-new.component.css'],
  providers: [UserService, ContainerService]
})
export class ContainerEditComponent implements OnInit {
  public page_title: string;
  public container : Container;
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
    private _containerService: ContainerService
  ) { 
    this.page_title = "Editar formato";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.container = new Container(1, '', 1, '');
  }

  ngOnInit(){
    this.getContainer();
  }

  onSubmit(form){
    this._containerService.update(this.token, this.container, this.container.id).subscribe(
      response => {
        if(response.status == 'success'){
          this.status = 'success';
          this._router.navigate(['/formato', this.container.id]);
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

  getContainer(){
    //Sacar el id
    this._route.params.subscribe(params => {
      let id = +params['id'];

      //Petición AJAX
      this._containerService.getContainer(id).subscribe(
        response => {
          if(response.status == 'success'){
            this.container = response.container;
          }else{
            this._router.navigate(['/gestion-formatos']);
          }
        },
        error => {
          console.log(<any>error);
          this._router.navigate(['/gestion-formatos']);
        }
      );
    });
  }

}
