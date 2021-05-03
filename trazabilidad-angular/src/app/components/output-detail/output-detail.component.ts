import { Component, OnInit } from '@angular/core';
import { OutputDetail } from '../../models/outputdetail';
import { UserService } from '../../services/user.service';
import { OutputDetailService } from '../../services/outputDetail.services';

@Component({
  selector: 'app-output-detail',
  templateUrl: './output-detail.component.html',
  styleUrls: ['./output-detail.component.css'],
  providers: [UserService, OutputDetailService]
})
export class OutputDetailComponent implements OnInit {
  public page_title: string;
  public outputDetails;
  public identity;
  public token;
  public status: string;
  public page: number;

  constructor(
    private _userService: UserService,
    private _outputDetailService: OutputDetailService
  ) { 
    this.page_title = "Gestión detalles de salida";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }


  ngOnInit(){
    this.getOutputDetails();
  }

  getOutputDetails(){
    this._outputDetailService.getOutputDetails().subscribe(
      response => {
        this.outputDetails = response.output_details;
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  deleteOutputDetail(id){
    this._outputDetailService.delete(this.token, id).subscribe(
      response => {
        this.getOutputDetails();
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
