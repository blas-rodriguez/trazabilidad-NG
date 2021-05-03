import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Buyer } from '../../models/buyer';
import { UserService } from '../../services/user.service';
import { BuyerService } from '../../services/buyer.service';

@Component({
  selector: 'app-buyer-new',
  templateUrl: './buyer-new.component.html',
  styleUrls: ['./buyer-new.component.css'],
  providers: [UserService, BuyerService]
})
export class BuyerNewComponent implements OnInit {
  public page_title: string;
  public buyer: Buyer;
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
    private _buyerService: BuyerService
  ) { 
    this.page_title = "Crear comprador";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.buyer = new Buyer(1, '', '', '', '', '', '', '', '', '');
  }

  ngOnInit(): void {
  }

  onSubmit(form){
    this._buyerService.create(this.token, this.buyer).subscribe(
      response => {
        if(response.status == 'success'){
          this.buyer = response.buyer;
          this.status = 'success';

          this._router.navigate(['/gestion-compradores']);
          
        }else{
          this.status = 'error';
        }

      },
      error => {
        this.status ="error";
        console.log(<any>error);
      }
    );
  }

}
