import { Component, OnInit } from '@angular/core';
import { Buyer } from '../../models/buyer';
import { UserService } from '../../services/user.service';
import { BuyerService } from '../../services/buyer.service';

@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.css'],
  providers: [UserService, BuyerService]
})
export class BuyerComponent implements OnInit {
  public page_title: string;
  public buyers;
  public identity;
  public token;
  public status: string;
  public page: number;

  constructor(
    private _userService: UserService,
    private _buyerService: BuyerService
  ) { 
    this.page_title = "Gestión de compradores";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(){
    this.getBuyers();
   
  }

  getBuyers(){
    this._buyerService.getBuyers().subscribe(
      response => {
        if(response.status == 'success'){
          this.buyers = response.buyers;
        }
      },
      error =>{
        console.log(<any>error);
      }
    );
  }

  deleteBuyer(id){
    this._buyerService.delete(this.token, id).subscribe(
      response => {
        this.getBuyers();
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
