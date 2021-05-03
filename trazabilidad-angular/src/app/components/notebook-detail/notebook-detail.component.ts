import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Notebook } from '../../models/notebook';
import { NotebookService } from '../../services/notebook.service';

@Component({
  selector: 'app-notebook-detail',
  templateUrl: './notebook-detail.component.html',
  styleUrls: ['./notebook-detail.component.css'],
  providers: [NotebookService]
})
export class NotebookDetailComponent implements OnInit {
  public notebook: Notebook;

  constructor(
    private _notebookService: NotebookService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(){
    this.getNotebook();
  }

  getNotebook(){
    //Sacar el id
    this._route.params.subscribe(params => {
      let id = +params['id'];

      //Petición AJAX
      this._notebookService.getNotebook(id).subscribe(
        response => {
          if(response.status == 'success'){
            this.notebook = response.notebook;
          }else{
            this._router.navigate(['/gestion-cuaderno-campo']);
          }
        },
        error => {
          console.log(<any>error);
          this._router.navigate(['/gestion-cuaderno-campo']);
        }
      );
    });
  }

}
