import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Buyer } from '../../models/buyer';
import { UserService } from '../../services/user.service';
import { BuyerService } from '../../services/buyer.service';

@Component({
  selector: 'app-buyer-edit',
  templateUrl: '../buyer-new/buyer-new.component.html',
  styleUrls: ['../buyer-new/buyer-new.component.css'],
  providers: [UserService, BuyerService]
})
export class BuyerEditComponent implements OnInit {
  public page_title: string;
  public buyer : Buyer;
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
    this.page_title = "Editar comprador";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.buyer = new Buyer(1, '', '', '', '', '', '', '', '', '');
  }

  ngOnInit(){
    this.getBuyer();
  }

  onSubmit(form){
   this._buyerService.update(this.token, this.buyer, this.buyer.id).subscribe(
     response => {
       if(response.status = 'success'){
         this.status = 'success';
         this._router.navigate(['/comprador', this.buyer.id]);
       }else{
        this.status = 'error';
       }
     },
     error =>{
       console.log(<any>error);
       this.status = 'error';
     }
   );
  }

  getBuyer(){
    //Sacar el id
    this._route.params.subscribe(params => {
      let id = +params['id'];

      //Petición AJAX
      this._buyerService.getBuyer(id).subscribe(
        response => {
          if(response.status == 'success'){
            this.buyer = response.buyer;
          }else{
            this._router.navigate(['/gestion-compradores']);
          }
        },
        error =>{
          console.log(<any>error);
          this._router.navigate(['/gestion-compradores']);
        }
      );
    });
  }

}

