import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Zone } from '../../models/zone';
import { UserService } from '../../services/user.service';
import { ZoneService } from '../../services/zone.service';

@Component({
  selector: 'app-zone-edit',
  templateUrl: '../zone-new/zone-new.component.html',
  styleUrls: ['../zone-new/zone-new.component.css'],
  providers: [UserService, ZoneService]
})
export class ZoneEditComponent implements OnInit {
  public page_title: string;
  public zone: Zone;
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
    private _zoneService: ZoneService
  ) { 
    this.page_title = "Editar zona";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.zone = new Zone(1, '', '');
  }

  ngOnInit(){
    this.getZone();
  }

  onSubmit(form){
    this._zoneService.update(this.token, this.zone, this.zone.id).subscribe(
      response => {
        if(response.status = 'success'){
          this.status = 'success';
          this._router.navigate(['/zona', this.zone.id]);
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

  getZone(){
    this._route.params.subscribe(params => {
      let id = +params['id'];

      this._zoneService.getZone(id).subscribe(
        response => {
          if(response.status == 'success'){
            this.zone = response.zone;
          }else{
            this._router.navigate(['/gestion-zonas']);
          }
        },
        error => {
          console.log(<any>error);
          this._router.navigate(['/gestion-zonas']);
        }
      );
    });
  }

}
