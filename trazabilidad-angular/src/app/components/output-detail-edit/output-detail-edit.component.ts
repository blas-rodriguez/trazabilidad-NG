import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { OutputDetail } from '../../models/outputdetail';
import { UserService } from '../../services/user.service';
import { OutputDetailService } from '../../services/outputDetail.services';
import { PackagingLineService } from '../../services/packagingLine.service';
import { EntryLotService } from '../../services/entryLot.service';

@Component({
  selector: 'app-output-detail-edit',
  templateUrl: '../output-detail-new/output-detail-new.component.html',
  styleUrls: ['../output-detail-new/output-detail-new.component.css'],
  providers: [UserService, OutputDetailService, PackagingLineService, EntryLotService]
})
export class OutputDetailEditComponent implements OnInit {
  public page_title: string;
  public output_detail: OutputDetail;
  public packaging_lines;
  public entries_lots;
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
    private _outputDetailService: OutputDetailService,
    private _entryLotService: EntryLotService,
    private _packagingLineService: PackagingLineService
  ) { 
    this.page_title = "Editar detalle de salida";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.output_detail = new OutputDetail(1, 1, 1, 1, '');
  }

  ngOnInit(){
    this.getEntriesLot();
    this.getPackagingLines();
    this.getOutputDetail();
  }

  getEntriesLot(){
    this._entryLotService.getEntriesLot().subscribe(
      response => {
        if(response.status == 'success'){
          this.entries_lots = response.entries_lots;
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  getPackagingLines(){
    this._packagingLineService.getPackagingLines().subscribe(
      response => {
        if(response.status == 'success'){
          this.packaging_lines = response.packaging_lines;
        }
      },
      error => {
        this.status = 'error';
        console.log(<any>error);
      }
    );
  }

  onSubmit(form){
    this._outputDetailService.update(this.token, this.output_detail, this.output_detail.id).subscribe(
      response => {
        if(response.status == 'success'){
          this.status = 'success';
          this._router.navigate(['/detalle-salida', this.output_detail.id]);
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

  getOutputDetail(){
    this._route.params.subscribe(params => {
      let id = +params['id'];

      //Petición AJAX
      this._outputDetailService.getOutputDetail(id).subscribe(
        response => {
          if(response.status == 'success'){
            this.output_detail = response.output_detail;
          }else{
            this._router.navigate(['/gestion-detalles-salida']); 
          }
        },
        error => {
          console.log(<any>error);
          this._router.navigate(['/gestion-detalles-salida']);
        }
      );
    });
  }

}
