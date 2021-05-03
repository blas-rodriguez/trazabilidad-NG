import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OutputDetail } from '../models/outputdetail';
import { global } from './global';

@Injectable()
export class OutputDetailService {
    public url: string;

    constructor(
        private _http: HttpClient
    ){
        this.url = global.url
    }

    create(token, output_detail):Observable<any>{
        let json = JSON.stringify(output_detail);
        let params = "json="+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);

        return this._http.post(this.url + 'output_detail', params, {headers: headers});
    }

    getOutputDetails():Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-ww-form-urlencoded');

        return this._http.get(this.url + 'output_detail', {headers: headers});
    }

    getOutputDetail(id):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-ww-form-urlencoded');

        return this._http.get(this.url + 'output_detail/' +id, {headers: headers});
    }
    
    update(token, output_detail, id):Observable<any>{
        delete output_detail.entry_lot;
        delete output_detail.packaging_line;
        delete output_detail.updated_at;

        let json = JSON.stringify(output_detail);
        let params = "json="+json;console.log(params);

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);

        return this._http.put(this.url+ 'output_detail/' +id, params, {headers: headers});
    }
    
    delete(token, id){
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set ('Authorization', token);

        return this._http.delete(this.url +'output_detail/' +id, {headers: headers});
    }
}