import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute, Params, Router } from '@angular/router';
import { Container } from '../../models/container';
import { UserService } from '../../services/user.service';
import { ContainerService } from '../../services/container.service';

@Component({
  selector: 'app-container-new',
  templateUrl: './container-new.component.html',
  styleUrls: ['./container-new.component.css'],
  providers: [UserService, ContainerService]
})
export class ContainerNewComponent implements OnInit {
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
    this.page_title = "Crear formato";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.container = new Container(1, '', 1, '');
  }

  ngOnInit(): void {
  }

  onSubmit(form){
    this._containerService.create(this.token, this.container).subscribe(
      response => {
        if(response.status == 'success'){
          this.container = response.container;
          this.status = 'success';

          this._router.navigate(['/gestion-formatos']);
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
  
}
