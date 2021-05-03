import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Process } from '../../models/process';
import { ProcessService } from '../../services/process.service';

@Component({
  selector: 'app-process-detail',
  templateUrl: './process-detail.component.html',
  styleUrls: ['./process-detail.component.css'],
  providers: [ProcessService]
})
export class ProcessDetailComponent implements OnInit {
  public process: Process;

  constructor(
    private _processService: ProcessService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(){
    this.getProcess();
  }

  getProcess(){
    this._route.params.subscribe(params =>{
      let id = +params['id'];

      //Petición AJAX
      this._processService.getProcess(id).subscribe(
        response => {
          if(response.status == 'success'){
            this.process = response.process;
          }else{
            this._router.navigate(['/gestion-tratamientos']); 
          }
        },
        error => {
          console.log(<any>error);
          this._router.navigate(['/gestion-tratamientos']);
        }
      );
    });
  }

}
