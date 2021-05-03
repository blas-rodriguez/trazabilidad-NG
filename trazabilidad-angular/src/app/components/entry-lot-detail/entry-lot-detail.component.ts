import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EntryLot } from '../../models/entrylot';
import { EntryLotService } from '../../services/entryLot.service';

@Component({
  selector: 'app-entry-lot-detail',
  templateUrl: './entry-lot-detail.component.html',
  styleUrls: ['./entry-lot-detail.component.css'],
  providers: [EntryLotService]
})
export class EntryLotDetailComponent implements OnInit {
  public entry_lot: EntryLot;

  constructor(
    private _entryLotService: EntryLotService,
    private _router: Router,
    private _route: ActivatedRoute

  ) { }

  ngOnInit(){
    this.getEntryLot();
  }

  getEntryLot(){
    //Sacar id
    this._route.params.subscribe(params => {
      let id = +params['id'];

      //Petición AJAX
      this._entryLotService.getEntryLot(id).subscribe(
        response => {
          if(response.status == 'success'){
            this.entry_lot = response.entry_lot;
          }else{
            this._router.navigate(['/gestion-lotes-entrada']);
          }
        },
        error => {
          console.log(<any>error);
          this._router.navigate(['/gestion-lotes-entrada']);
        }
      );
    });
  }
}
