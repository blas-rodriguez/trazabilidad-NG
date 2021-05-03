import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Article } from '../../models/article';
import { UserService } from '../../services/user.service';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-article-new',
  templateUrl: './article-new.component.html',
  styleUrls: ['./article-new.component.css'],
  providers: [UserService, ArticleService]
})
export class ArticleNewComponent implements OnInit {
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
    this.page_title = "Crear artículo";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.article = new Article(1, "", "");
  }

  ngOnInit(): void {
  }

  onSubmit(form){
    this._articleService.create(this.token, this.article).subscribe(
      response => {
        if(response.status == 'success'){
          this.article = response.article;
          this.status = 'success';
        }
      },
      error => {
        this.status = 'error';
        console.log(<any>error);
      }
    );
  }

}
