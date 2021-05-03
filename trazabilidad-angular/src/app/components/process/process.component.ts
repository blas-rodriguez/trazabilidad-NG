import { Component, OnInit } from '@angular/core';
import { Process } from '../../models/process' ;
import { UserService } from '../../services/user.service';
import { ProcessService } from '../../services/process.service';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.css'],
  providers: [UserService, ProcessService]
})
export class ProcessComponent implements OnInit {
  public page_title: string;
  public processes;
  public identity;
  public token;
  public status: string;
  public page: number;

  constructor(
    private _userService: UserService,
    private _processService: ProcessService
  ) { 
    this.page_title = "Gestión de tratamientos";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(){
    this.getProcesses();
  }

  getProcesses(){
    this._processService.getProcesses().subscribe(
      response => {
        if(response.status == 'success'){
          this.processes = response.processes;
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  deleteProcess(id){
    this._processService.delete(this.token, id).subscribe(
      response => {
        this.getProcesses();
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
