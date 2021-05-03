import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Article } from '../../models/article';
import { UserService } from '../../services/user.service';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-article-edit',
  templateUrl: '../article-new/article-new.component.html',
  styleUrls: ['../article-new/article-new.component.css'],
  providers: [UserService, ArticleService]
})
export class ArticleEditComponent implements OnInit {
  public page_title: string;
  public article : Article;
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
    private _articleService: ArticleService
  ) { 
    this.page_title = "Editar artículo";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.article = new Article(1, '', ''); 
  }

  ngOnInit(){
    this.getArticle();
  }

  onSubmit(form){
    this._articleService.update(this.token, this.article, this.article.id).subscribe(
      response => {
        if(response.status = 'success'){
          this.status = 'success';
          this._router.navigate(['/articulo', this.article.id]);
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

  getArticle(){
    //Sacar el id
    this._route.params.subscribe(params => {
      let id = +params['id'];

      //Petición AJAX
      this._articleService.getArticle(id).subscribe(
        response => {
          if(response.status == 'success'){
            this.article = response.article;
          }else{
            this._router.navigate(['/gestion-articulos']);  
          }
        },
        error => {
          console.log(<any>error);
          this._router.navigate(['/gestion-articulos']);
        }
      );
    });
  }

}
