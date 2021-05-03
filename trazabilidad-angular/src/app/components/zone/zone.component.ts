import { Component, OnInit } from '@angular/core';
import { Zone } from '../../models/zone';
import { UserService } from '../../services/user.service';
import { ZoneService } from '../../services/zone.service';

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.css'],
  providers: [UserService, ZoneService]
})
export class ZoneComponent implements OnInit {
  public page_title: string;
  public zones;
  public identity;
  public token;
  public status: string;
  public page: number;

  constructor(
    private _userService: UserService,
    private _zoneService: ZoneService
  ) { 
    this.page_title = "Gestión de zonas";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(){
    this.getZones();
  }

  getZones(){
    this._zoneService.getZones().subscribe(
      response => {
        if(response.status == 'success'){
          this.zones = response.zones;
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  deleteZone(id){
    this._zoneService.delete(this.token, id).subscribe(
      response => {
        this.getZones();
      },
      error =>{
        console.log(<any>error);
      }
    );
  }
}
