import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Zone } from '../../models/zone';
import { UserService } from '../../services/user.service';
import { ZoneService } from '../../services/zone.service';

@Component({
  selector: 'app-zone-new',
  templateUrl: './zone-new.component.html',
  styleUrls: ['./zone-new.component.css'],
  providers: [UserService, ZoneService]
})
export class ZoneNewComponent implements OnInit {
  public page_title: string;
  public zone : Zone;
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
    this.page_title = "Crear zona";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.zone = new Zone(1, '', '');
  }

  ngOnInit(): void {
  }

  onSubmit(form){
    this._zoneService.create(this.token, this.zone).subscribe(
      response => {
        if(response.status == 'success'){
          this.zone = response.zone;
          this.status = 'success';

          this._router.navigate(['/gestion-zonas']);
        }else{
          this.status = "error";
        }
      },
      error => {
        this.status = "error";
        console.log(<any>error);
      }
    );
  }

}
