import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Report } from '../../models/report';
import { UserService } from '../../services/user.service';
import { ReportService } from '../../services/report.service';
import { BatchOutputService } from '../../services/batchOutput.service';
import { EntryLotService } from '../../services/entryLot.service';

@Component({
  selector: 'app-report-edit',
  templateUrl: '../report-new/report-new.component.html',
  styleUrls: ['../report-new/report-new.component.css'],
  providers: [UserService, ReportService, BatchOutputService, EntryLotService]
})
export class ReportEditComponent implements OnInit {
  public page_title: string;
  public report: Report;
  public batch_outputs;
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
    private _reportService: ReportService,
    private _batchOutputService: BatchOutputService,
    private _entryLotService: EntryLotService
  ) { 
    this.page_title = "Editar incidencia";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.report = new Report(1, 0, 0, '', '');
  }

  ngOnInit(){
    this.getBatchOutputs();
    this.getEntriesLot();
    this.getReport();
  }

  getBatchOutputs(){
    this._batchOutputService.getBatchOutputs().subscribe(
      response => {
        if(response.status == 'success'){
          this.batch_outputs = response.batch_outputs;console.log(this.batch_outputs);
        }
      },
      error => {
        console.log(<any>error);
      }
    );
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

  getReport(){
    this._route.params.subscribe(params => {
      let id = +params['id'];

      //Peticion AJAX
      this._reportService.getReport(id).subscribe(
        response =>  {
          if(response.status == 'success'){
            this.report = response.report;
          }else{
            this._router.navigate(['/gestion-incidencias']);
          }
        },
        error => {
          console.log(<any>error);
          this._router.navigate(['/gestion-incidencias']);
        }
      );
    });
  }

  onSubmit(form){
    this._reportService.update(this.token, this.report, this.report.id).subscribe(
      response => {
        if(response.status = 'success'){
          this.status = 'success';
          this._router.navigate(['/incidencia', this.report.id]);
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

}
