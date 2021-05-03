import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BatchOutput } from '../../models/batchoutput';
import { UserService } from '../../services/user.service';
import { BatchOutputService } from '../../services/batchOutput.service';
import { BuyerService } from '../../services/buyer.service';
import { ArticleService } from '../../services/article.service';
import { CarrierService } from '../../services/carrier.service';

@Component({
  selector: 'app-batch-output-edit',
  templateUrl: '../batch-output-new/batch-output-new.component.html',
  styleUrls: ['../batch-output-new/batch-output-new.component.css'],
  providers: [UserService, BatchOutputService, BuyerService, ArticleService, CarrierService]
})
export class BatchOutputEditComponent implements OnInit {
  public page_title: string;
  public batch_output: BatchOutput;
  public buyers;
  public articles;
  public carriers;
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
    private _batchOutputService: BatchOutputService,
    private _buyerService: BuyerService,
    private _articleService: ArticleService,
    private _carrierService: CarrierService
  ) { 
    this.page_title = "Editar lote de salida";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.batch_output = new BatchOutput(1, 1, 1, 1, 0, 0, "");
  }

  ngOnInit(){
    this.getArticles();
    this.getBuyers();
    this.getCarriers();
    this.getBatchOutput();
  }

  getArticles(){
    this._articleService.getArticles().subscribe(
      response => {
        if(response.status == 'success'){
          this.articles = response.articles;
        }
      },
      error => {
        console.log(<any>error);
      }
    );
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

  getCarriers(){
    this._carrierService.getCarriers().subscribe(
      response => {
        if(response.status == 'success'){
          this.carriers = response.carriers;
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  onSubmit(form){
    this._batchOutputService.update(this.token, this.batch_output, this.batch_output.id).subscribe(
      response => {
        if(response.status == 'success'){
          this.status = 'success';
          this._router.navigate(['/lote-salida', this.batch_output.id]);
        }else{
          this.status = 'error';
        }
      },
      error => {
        console.log(<any>error);
        this.status = 'error';
      }
    );
  }

  getBatchOutput(){
    //Sacar el id
    this._route.params.subscribe(params => {
      let id = +params['id'];

      //Peticion AJAX
      this._batchOutputService.getBatchOutput(id).subscribe(
        response => {
          if(response.status == 'success'){
            this.batch_output = response.batch_output;
          }else{
            this._router.navigate(['/gestion-lotes-salida']); 
          }
        },
        error => {
          console.log(<any>error);
          this._router.navigate(['/gestion-lotes-salida']);
        }
      );
    });
  }
}
