import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Zone } from '../../models/zone';
import { ZoneService } from '../../services/zone.service';

@Component({
  selector: 'app-zone-detail',
  templateUrl: './zone-detail.component.html',
  styleUrls: ['./zone-detail.component.css'],
  providers: [ZoneService]
})
export class ZoneDetailComponent implements OnInit {
  public zone: Zone;

  constructor(
    private _zoneService: ZoneService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(){
    this.getZone();
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
