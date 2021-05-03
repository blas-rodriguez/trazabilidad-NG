import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BatchOutput } from '../../models/batchoutput';
import { BatchOutputService } from '../../services/batchOutput.service';

@Component({
  selector: 'app-batch-output-detail',
  templateUrl: './batch-output-detail.component.html',
  styleUrls: ['./batch-output-detail.component.css'],
  providers: [BatchOutputService]
})
export class BatchOutputDetailComponent implements OnInit {
  public batch_output: BatchOutput

  constructor(
    private _batchOutputService: BatchOutputService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(){
    this.getBatchOutput();
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
