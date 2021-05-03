import { Component, OnInit } from '@angular/core';
import { Container } from '../../models/container';
import { UserService } from '../../services/user.service';
import { ContainerService } from '../../services/container.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css'],
  providers: [UserService, ContainerService]
})
export class ContainerComponent implements OnInit {
  public page_title: string;
  public containers;
  public identity;
  public token;
  public status: string;
  public page: number;

  constructor(
    private _userService: UserService,
    private _containerService: ContainerService
  ) { 
    this.page_title = "Gestión de formatos";
    this.identity = this._userService.getIdentity();
    this. token = this._userService.getToken();
  }

  ngOnInit(){
    this.getContainers();
  }

  getContainers(){
    this._containerService.getContainers().subscribe(
      response => {
        if(response.status == 'success'){
          this.containers = response.containers;
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  deleteContainer(id){
    this._containerService.delete(this.token, id).subscribe(
      response => {
        this.getContainers();
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
