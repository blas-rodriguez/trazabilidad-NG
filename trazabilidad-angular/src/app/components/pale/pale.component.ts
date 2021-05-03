import { Component, OnInit } from '@angular/core';
import { Pale } from '../../models/pale';
import { UserService } from '../../services/user.service';
import { PaleService } from '../../services/pale.service';

@Component({
  selector: 'app-pale',
  templateUrl: './pale.component.html',
  styleUrls: ['./pale.component.css'],
  providers: [UserService, PaleService]
})
export class PaleComponent implements OnInit {
  public page_title: string;
  public pales;
  public identity;
  public token;
  public status: string;
  public page: number;

  constructor(
    private _userService: UserService,
    private _paleService: PaleService
  ) { 
    this.page_title = "Gestión de pales";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(){
    this.getPales();
  }

  getPales(){
    this._paleService.getPales().subscribe(
      response => {
        if(response.status == 'success'){
          this.pales = response.pales;
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  deletePale(id){
    this._paleService.delete(this.token, id).subscribe(
      response => {
        this.getPales();
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
