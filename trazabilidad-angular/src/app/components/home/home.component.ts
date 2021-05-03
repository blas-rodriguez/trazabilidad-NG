import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
//import { global } from '../../services/global';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UserService]
})
export class HomeComponent implements OnInit {
  public page_title: string;
  public identity;
  public token;
  public url;

  constructor(
    public _userService: UserService
  ) { 
    this.page_title = 'Trazabilidad-NG';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    //this.url = global.url;
  }

  ngOnInit(): void {
  }

}
