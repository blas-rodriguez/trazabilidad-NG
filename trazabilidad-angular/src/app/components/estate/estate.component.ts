import { Component, OnInit } from '@angular/core';
import { Estate } from '../../models/estate';
import { UserService } from '../../services/user.service';
import { EstateService } from '../../services/estate.service';

@Component({
  selector: 'app-estate',
  templateUrl: './estate.component.html',
  styleUrls: ['./estate.component.css'],
  providers: [UserService, EstateService]
})
export class EstateComponent implements OnInit {
  public page_title: string;
  public estates;
  public identity;
  public token;
  public status: string;
  public page: number;

  constructor(
    private _userService:  UserService,
    private _estateService: EstateService
  ) { 
    this.page_title = "Gestión de fincas";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(){
    this.getEstates();
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

  deleteEstate(id){
    this._estateService.delete(this.token, id).subscribe(
      response => {
        this.getEstates();
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
