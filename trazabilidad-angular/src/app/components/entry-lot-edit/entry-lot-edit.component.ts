import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EntryLot } from '../../models/entrylot';
import { UserService } from '../../services/user.service';
import { EntryLotService } from '../../services/entryLot.service';
import { ArticleService } from '../../services/article.service';
import { CarrierService } from '../../services/carrier.service';
import { NotebookService } from '../../services/notebook.service';

@Component({
  selector: 'app-entry-lot-edit',
  templateUrl: '../entry-lot-new/entry-lot-new.component.html',
  styleUrls: ['../entry-lot-new/entry-lot-new.component.css'],
  providers: [UserService, EntryLotService, ArticleService, CarrierService, NotebookService]
})
export class EntryLotEditComponent implements OnInit {
  public page_title: string;
  public entry_lot: EntryLot;
  public articles;
  public carriers;
  public notebooks;
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
    private _entryLotService: EntryLotService,
    private _articleService: ArticleService,
    private _carrierService: CarrierService,
    private _notebookService: NotebookService
  ) { 
    this.page_title = "Editar lote de entrada";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.entry_lot = new EntryLot(1, 1, 1, 1, 1, 1, 1, '0', '', '', '');
  }

  ngOnInit(){
    this.getArticles();
    this.getCarriers();
    this.getNotebooks();
    this.getEntryLot();
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

  getNotebooks(){
    this._notebookService.getNotebooks().subscribe(
      response => {
        if(response.status == 'success'){
          this.notebooks = response.notebooks;
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  onSubmit(form){
    this._entryLotService.update(this.token, this.entry_lot, this.entry_lot.id).subscribe(
      response => {
        if(response.status = 'success'){
          this.status = 'success';
          this._router.navigate(['/lote-entrada', this.entry_lot.id]);
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

  getEntryLot(){
    //Sacar id
    this._route.params.subscribe(params => {
      let id = +params['id'];

      //Petición AJAX
      this._entryLotService.getEntryLot(id).subscribe(
        response => {
          if(response.status == 'success'){
            this.entry_lot = response.entry_lot;
          }else{
            this._router.navigate(['/gestion-lotes-entrada']);
          }
        },
        error => {
          console.log(<any>error);
          this._router.navigate(['/gestion-lotes-entrada']);
        }
      );
    });
  }

}
