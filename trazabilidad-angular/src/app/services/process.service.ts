import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Process } from '../models/process';
import { global } from './global';

@Injectable()
export class ProcessService {
    public url: string;

    constructor(
        private _http: HttpClient
    ){
        this.url = global.url;
    }

    create(token, process):Observable<any>{
        let json = JSON.stringify(process);
        let params = "json="+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);

        return this._http.post(this.url + 'process', params, {headers:headers});
    }

    getProcesses():Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');

        return this._http.get(this.url + 'process', {headers:headers});
    }

    getProcess(id):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');

        return this._http.get(this.url + 'process/' +id, {headers:headers});
    }

    updated(token, process, id):Observable<any>{
        delete process.notebook;
        delete process.updated_at;

        let json = JSON.stringify(process);
        let params = "json="+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);

        return this._http.put(this.url + 'process/' +id, params, {headers: headers});
    }

    delete(token, id){
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);

        return this._http.delete(this.url + 'process/' +id, {headers: headers});
    }
}