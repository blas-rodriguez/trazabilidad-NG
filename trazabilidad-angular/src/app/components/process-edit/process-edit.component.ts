import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Process } from '../../models/process';
import { UserService } from '../../services/user.service';
import { ProcessService } from '../../services/process.service';
import { NotebookService } from '../../services/notebook.service';

@Component({
  selector: 'app-process-edit',
  templateUrl: '../process-new/process-new.component.html',
  styleUrls: ['../process-new/process-new.component.css'],
  providers: [UserService, ProcessService, NotebookService]
})
export class ProcessEditComponent implements OnInit {
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
    this.page_title = "Editar tratamiento";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.process = new Process(1, 1, '', '', '');
  }

  ngOnInit(){
    this.getNotebooks();
    this.getProcess();
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

  onSubmit(form){
    this._processService.updated(this.token, this.process, this.process.id).subscribe(
      response => {
        if(response.status == 'success'){
          this.status = 'success';
          this._router.navigate(['/tratamiento', this.process.id]);
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
