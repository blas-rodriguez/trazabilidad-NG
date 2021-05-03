import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Container } from '../../models/container';
import { ContainerService } from '../../services/container.service';

@Component({
  selector: 'app-container-detail',
  templateUrl: './container-detail.component.html',
  styleUrls: ['./container-detail.component.css'],
  providers: [ContainerService]
})
export class ContainerDetailComponent implements OnInit {
  public container: Container;

  constructor(
    private _containerService: ContainerService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit(){
    this.getContainer();
  }

  getContainer(){
    //Sacar el id
    this._route.params.subscribe(params => {
      let id = +params['id'];

      //Petición AJAX
      this._containerService.getContainer(id).subscribe(
        response => {
          if(response.status == 'success'){
            this.container = response.container;
          }else{
            this._router.navigate(['/gestion-formatos']);
          }
        },
        error => {
          console.log(<any>error);
          this._router.navigate(['/gestion-formatos']);
        }
      );
    });
  }

}
