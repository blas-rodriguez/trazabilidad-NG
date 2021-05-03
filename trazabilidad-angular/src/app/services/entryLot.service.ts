import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EntryLot } from '../models/entrylot';
import { global } from './global';

@Injectable()
export class EntryLotService {
    public url: string;

    constructor(
        private _http: HttpClient
    ){
        this.url = global.url;
    }

    create(token, entryLot):Observable<any>{
        let json = JSON.stringify(entryLot);
        let params = "json="+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);

        return this._http.post(this.url + 'entry_lot', params, {headers:headers});
    }

    getEntriesLot():Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');

        return this._http.get(this.url + 'entry_lot', {headers: headers});
    }

    getEntryLot(id):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');

        return this._http.get(this.url + 'entry_lot/' +id, {headers: headers});
    }

    update(token, entryLot, id):Observable<any>{
        delete entryLot.article;
        delete entryLot.carrier;
        delete entryLot.notebook;
        delete entryLot.updated_at;
        
        let json = JSON.stringify(entryLot) ;
        let params = "json="+json;console.log(params);

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);

        return this._http.put(this.url + 'entry_lot/' +id, params, {headers: headers});
    }

    delete(token, id){
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);

        return this._http.delete(this.url + 'entry_lot/' +id, {headers: headers});
    }
}