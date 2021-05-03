import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Report } from '../../models/report';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.css'],
  providers: [ReportService]
})
export class ReportDetailComponent implements OnInit {
  public report: Report;

  constructor(
    private _reportService: ReportService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(){
    this.getReport();
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

}
