import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Estate } from '../../models/estate';
import { UserService } from '../../services/user.service';
import { EstateService } from '../../services/estate.service';

@Component({
  selector: 'app-estate-new',
  templateUrl: './estate-new.component.html',
  styleUrls: ['./estate-new.component.css'],
  providers: [UserService, EstateService]
})
export class EstateNewComponent implements OnInit {
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
    this.page_title = "Crear finca";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.estate = new Estate(1, '', '', '', '', '', '', '');
  }

  ngOnInit(): void {
  }

  onSubmit(form){
    this._estateService.create(this.token, this.estate).subscribe(
      response => {
        if(response.status == 'success'){
          this.estate = response.estate;
          this.status = 'success';
        }

      },
      error => {
        this.status = 'error';
        console.log(<any>error);
      }
    );
  }

}
