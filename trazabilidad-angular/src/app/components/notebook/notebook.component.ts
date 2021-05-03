import { Component, OnInit } from '@angular/core';
import { Notebook } from '../../models/notebook';
import { UserService } from '../../services/user.service';
import { NotebookService } from '../../services/notebook.service';

@Component({
  selector: 'app-notebook',
  templateUrl: './notebook.component.html',
  styleUrls: ['./notebook.component.css'],
  providers: [UserService, NotebookService]
})
export class NotebookComponent implements OnInit {
  public page_title: string;
  public notebooks;
  public identity;
  public token;
  public status: string;
  public page: number;

  constructor(
    private _userService: UserService,
    private _notebookService: NotebookService
  ) { 
    this.page_title = "Gestión de cuaderno de campo";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
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

  deleteNotebook(id){
    this._notebookService.delete(this.token, id).subscribe(
      reponse => {
        this.getNotebooks();
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
