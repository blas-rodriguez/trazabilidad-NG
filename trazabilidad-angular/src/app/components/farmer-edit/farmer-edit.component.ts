import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Farmer } from '../../models/farmer';
import { UserService } from '../../services/user.service';
import { FarmerService } from '../../services/farmer.service';
import { ZoneService } from '../../services/zone.service';

@Component({
  selector: 'app-farmer-edit',
  templateUrl: '../farmer-new/farmer-new.component.html',
  styleUrls: ['../farmer-new/farmer-new.component.css'],
  providers: [UserService, FarmerService, ZoneService]
})
export class FarmerEditComponent implements OnInit {
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
    this.page_title = "Editar agricultor";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.farmer = new Farmer(1, 1, '', '', '', '', '', '', '', '');
  }

  ngOnInit(){
    this.getZones();
    this.getFarmer();
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
    this._farmerService.update(this.token, this.farmer, this.farmer.id).subscribe(
      response => {
        if(response.status = 'success'){
          this.status = 'success';
          this._router.navigate(['/agricultor', this.farmer.id]);
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

  getFarmer(){
    //Sacar el id
    this._route.params.subscribe(params => {
      let id = +params['id'];

      //Petición AJAX
      this._farmerService.getFarmer(id).subscribe(
        response => {
          if(response.status == 'success'){
            this.farmer =response.farmer;
          }else{
            this._router.navigate(['/gestion-agricultores']);
          }
        },
        error => {
          console.log(<any>error);
          this._router.navigate(['/gestion-agricultores']);
        }
      );
    });
  }

}
