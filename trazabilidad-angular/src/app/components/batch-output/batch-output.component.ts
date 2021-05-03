import { Component, OnInit } from '@angular/core';
import { BatchOutput } from '../../models/batchoutput';
import { UserService } from '../../services/user.service';
import { BatchOutputService } from '../../services/batchOutput.service';

@Component({
  selector: 'app-batch-output',
  templateUrl: './batch-output.component.html',
  styleUrls: ['./batch-output.component.css'],
  providers: [UserService, BatchOutputService]
})
export class BatchOutputComponent implements OnInit {
  public page_title: string;
  public batch_outputs;
  public identity;
  public token;
  public status: string;
  public page: number;

  constructor(
    private _userService: UserService,
    private _batchOutputService: BatchOutputService
  ) { 
    this.page_title = "Gestión de lotes de salida";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(){
    this.getBatchOutputs();
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

  deleteBatchOutput(id){
    this._batchOutputService.delete(this.token, id).subscribe(
      response => {
        this.getBatchOutputs();
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
