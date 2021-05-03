import { Component, OnInit } from '@angular/core';
import { EntryLot } from '../../models/entrylot';
import { UserService } from '../../services/user.service';
import { EntryLotService } from '../../services/entryLot.service';

@Component({
  selector: 'app-entry-lot',
  templateUrl: './entry-lot.component.html',
  styleUrls: ['./entry-lot.component.css'],
  providers: [UserService, EntryLotService]
})
export class EntryLotComponent implements OnInit {
  public page_title: string;
  public entries_lots;
  public identity;
  public token;
  public status: string;
  public page: number;

  constructor(
    private _userService: UserService,
    private _entryLotService: EntryLotService,
  ) { 
    this.page_title = "Gestión de lotes de entrada";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(){
    this.getEntriesLot();
  }

  getEntriesLot(){
    this._entryLotService.getEntriesLot().subscribe(
      response => {
        if(response.status == 'success'){
          this.entries_lots = response.entries_lots;
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  deleteEntryLot(id){
    this._entryLotService.delete(this.token, id).subscribe(
      response => {
        this.getEntriesLot();
      },
      error => {
        console.log(<any>error);
      }
    );
  }
}
