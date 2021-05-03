import { Component, OnInit } from '@angular/core';
import { Routes, ActivatedRoute, Params, Router } from '@angular/router';
import { Article } from '../../models/article';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css'],
  providers: [ArticleService]
})
export class ArticleDetailComponent implements OnInit {
  public article: Article;

  constructor(
    private _articleService: ArticleService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(){
    this.getArticle();
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
