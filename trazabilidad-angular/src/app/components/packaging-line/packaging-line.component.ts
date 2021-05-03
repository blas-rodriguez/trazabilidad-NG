import { Component, OnInit } from '@angular/core';
import { PackagingLine } from '../../models/packagingline';
import { UserService } from '../../services/user.service';
import { PackagingLineService} from '../../services/packagingLine.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-packaging-line',
  templateUrl: './packaging-line.component.html',
  styleUrls: ['./packaging-line.component.css'],
  providers: [ UserService, PackagingLineService]
})
export class PackagingLineComponent implements OnInit {
  public page_title: string;
  public packaging_lines;
  public identity;
  public token;
  public status: string;
  public page: number;

  constructor(
    private _userService: UserService,
    private _packagingLineService: PackagingLineService
  ) { 
    this.page_title = "Gestión de línea de envasado";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(){
    this.getPackagingLines();
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

  deletePackagingLine(id){
    this._packagingLineService.delete(this.token, id).subscribe(
      response => {
        this.getPackagingLines();
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
