import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Report } from '../models/report';
import { global } from './global';

@Injectable()
export class ReportService {
    public url: string;

    constructor(
        private _http: HttpClient
    ){
        this.url = global.url;
    }
    
    create(token, report):Observable<any>{
        let json = JSON.stringify(report);
        let params = "json="+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);

        return this._http.post(this.url + 'report', params, {headers:headers});
    }

    getReports():Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url + 'report', {headers:headers});
    }

    getReport(id):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url + 'report/' +id, {headers:headers});
    }

    update(token, report, id):Observable<any>{
        delete report.updated_at;
        delete report.batch_output;
        delete report.entry_lot;
       
        let json = JSON.stringify(report);
        let params = "json="+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);

        return this._http.put(this.url + 'report/' +id, params, {headers:headers});
    }
    
    delete(token, id){
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);

        return this._http.delete(this.url + 'report/' +id, {headers:headers});
    }
}