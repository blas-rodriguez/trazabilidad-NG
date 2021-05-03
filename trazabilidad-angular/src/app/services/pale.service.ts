import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pale } from '../models/pale';
import { global } from './global';

@Injectable()
export class PaleService {
    public url: string;

    constructor(
        private _http: HttpClient
    ){
        this.url = global.url;
    }

    create(token, pale):Observable<any>{
        let json = JSON.stringify(pale);
        let params = "json="+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);

        return this._http.post(this.url + 'pale', params, {headers:headers});
    }

    getPales():Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url + 'pale', {headers:headers});
    }

    getPale(id):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url + 'pale/' + id, {headers:headers});
    }

    update(token, pale, id):Observable<any>{
        delete pale.updated_at;
        delete pale.packaging_line;
        delete pale.container;
        delete pale.batch_output;

        let json = JSON.stringify(pale);
        let params = "json="+json;
        
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);

        return this._http.put(this.url + 'pale/' +id, params, {headers:headers});
    }
    
    delete(token, id){
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);

        return this._http.delete(this.url + 'pale/' +id, {headers:headers});   
    }
}