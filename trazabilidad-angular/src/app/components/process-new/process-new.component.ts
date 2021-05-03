import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Process } from '../../models/process';
import { UserService } from '../../services/user.service';
import { ProcessService } from '../../services/process.service';
import { NotebookService } from '../../services/notebook.service';

@Component({
  selector: 'app-process-new',
  templateUrl: './process-new.component.html',
  styleUrls: ['./process-new.component.css'],
  providers: [ UserService, ProcessService, NotebookService]
})
export class ProcessNewComponent implements OnInit {
  public page_title: string;
  public process: Process;
  public notebooks;
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
    private _processService: ProcessService,
    private _notebookService: NotebookService
  ) { 
    this.page_title = "Crear tratamiento";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.process = new Process(1, 1, '', '', '');
  }

  ngOnInit(){
    this.getNotebooks();
  }

  getNotebooks(){
    this._notebookService.getNotebooks().subscribe(
      response => {
        if(response.status == 'success'){
          this.notebooks = response.notebooks;
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  onSubmit(form){
    this._processService.create(this.token, this.process).subscribe(
      response => {
        if(response == 'success'){
          this.process = response.process;
          this.status = 'success';

          this._router.navigate(['/gestion-tratamientos']);
        }else{
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';
        console.log(<any>error);
      }
    );
  }

}
