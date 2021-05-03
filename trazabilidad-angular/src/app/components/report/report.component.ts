import { Component, OnInit } from '@angular/core';
import { Report } from '../../models/report';
import { UserService } from '../../services/user.service';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  providers: [UserService, ReportService]
})
export class ReportComponent implements OnInit {
  public page_title: string;
  public reports;
  public identity;
  public token;
  public status: string;
  public page: number;

  constructor(
    private _userService: UserService,
    private _reportService: ReportService
  ) { 
    this.page_title = "Gestión incidencias";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(){
    this.getReports();
  }

  getReports(){
    this._reportService.getReports().subscribe(
      response => {
        if(response.status == 'success'){
          this.reports = response.reports;
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  deleteReport(id){
    this._reportService.delete(this.token , id).subscribe(
      response => {
        this.getReports();
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
