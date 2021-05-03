import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Farmer } from '../../models/farmer';
import { UserService } from '../../services/user.service';
import { FarmerService } from '../../services/farmer.service';
import { ZoneService } from '../../services/zone.service';

@Component({
  selector: 'app-farmer-new',
  templateUrl: './farmer-new.component.html',
  styleUrls: ['./farmer-new.component.css'],
  providers: [UserService, FarmerService, ZoneService]
})
export class FarmerNewComponent implements OnInit {
  public page_title: string;
  public farmer: Farmer;
  public zones;
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
    private _farmerService: FarmerService,
    private _zoneService: ZoneService
  ) { 
    this.page_title = "Crear agricultor";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.farmer = new Farmer(1, 1, '', '', '', '', '', '', '', '');
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

  onSubmit(form){
    this._farmerService.create(this.token, this.farmer).subscribe(
      response => {
        if(response.status == 'success'){
          this.farmer = response.farmer;
          this.status = 'success';

          this._router.navigate(['/gestion-agricultores']);
        }else{
          this.status = 'error';
        }
      },
      error => {
        this.status = "error";
        console.log(<any>error);
      }
    );
  }

}
