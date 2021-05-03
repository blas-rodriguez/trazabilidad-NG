import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BatchOutput } from '../models/batchoutput';
import { global } from './global';

@Injectable()
export class BatchOutputService {
    public url: string;

    constructor(
        private _http: HttpClient
    ){
        this.url = global.url;
    }
    create(token, batch_output):Observable<any>{
        let json = JSON.stringify(batch_output);
        let params = "json="+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);
        
        return this._http.post(this.url+ 'batch_output', params, {headers: headers});
    }

    getBatchOutputs():Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url+ 'batch_output', {headers: headers});
    }

    getBatchOutput(id):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url+ 'batch_output/' + id, {headers: headers});
    }

    update(token, batch_output, id):Observable<any>{
        delete batch_output.updated_at;
        delete batch_output.buyer;
        delete batch_output.article;
        delete batch_output.carrier;

        let json = JSON.stringify(batch_output);
        let params = "json="+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);

        return this._http.put(this.url+ 'batch_output/' +id, params, {headers: headers});
    }

    delete(token, id){
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);

        return this._http.delete(this.url+ 'batch_output/' +id, {headers: headers});    
    }
}