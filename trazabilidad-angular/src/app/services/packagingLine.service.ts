import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders, JsonpClientBackend } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PackagingLine } from '../models/packagingline';
import { global } from './global';

@Injectable()
export class PackagingLineService{
    public url: string;

    constructor(
        private _http: HttpClient
    ){
        this.url = global.url;
    }

    create(token, packaging_line):Observable<any>{
        let json = JSON.stringify(packaging_line);
        let params = "json="+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);

        return this._http.post(this.url + 'packaging_line', params, {headers: headers});
    }

    getPackagingLines():Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url + 'packaging_line', {headers: headers});
    }

    getPackagingLine(id):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url + 'packaging_line/' + id, {headers: headers});
    }
    update(token, packaging_line, id):Observable<any>{
        delete packaging_line.updated_at;

        let json = JSON.stringify(packaging_line);
        let params = "json="+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);

        return this._http.put(this.url + 'packaging_line/' + id, params, {headers: headers});
    }

    delete(token, id){
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);

        return this._http.delete(this.url + 'packaging_line/' + id, {headers: headers});
    }
}