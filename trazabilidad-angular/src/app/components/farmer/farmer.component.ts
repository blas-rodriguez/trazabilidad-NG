import { Component, OnInit } from '@angular/core';
import { Farmer } from '../../models/farmer';
import { UserService } from '../../services/user.service';
import { FarmerService } from '../../services/farmer.service';

@Component({
  selector: 'app-farmer',
  templateUrl: './farmer.component.html',
  styleUrls: ['./farmer.component.css'],
  providers: [UserService, FarmerService]
})
export class FarmerComponent implements OnInit {
  public page_title: string;
  public farmers;
  public identity;
  public token;
  public status: string;
  public page: number;

  constructor(
    private _userService: UserService,
    private _farmerService: FarmerService
  ) { 
    this.page_title = "Gestión de agricultores";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(){
    this.getFarmers();
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

  deleteFarmer(id){
    this._farmerService.delete(this.token, id).subscribe(
      response => {
        this.getFarmers();
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
