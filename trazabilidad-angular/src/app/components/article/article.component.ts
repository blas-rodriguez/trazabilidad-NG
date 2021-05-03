import { Component, OnInit } from '@angular/core';
import { Article } from '../../models/article';
import { UserService } from '../../services/user.service';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  providers: [UserService, ArticleService]
})
export class ArticleComponent implements OnInit {
  public page_title: string;
  public articles;
  public identity;
  public token;
  public status: string;
  public page: number;

  constructor(
    private _userService: UserService,
    private _articleService: ArticleService
  ) { 
    this.page_title = "Gestión de artículos";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(){
    this.getArticles();
  }

  getArticles(){
    this._articleService.getArticles().subscribe(
      response => {
        if(response.status == 'success'){
          this.articles = response.articles;
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  deleteArticle(id){
    this._articleService.delete(this.token, id).subscribe(
      response => {
        this.getArticles();
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
