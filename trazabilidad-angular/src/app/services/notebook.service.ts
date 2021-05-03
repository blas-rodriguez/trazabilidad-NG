import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notebook } from '../models/notebook';
import { global } from './global';

@Injectable()
export class NotebookService {
    public url: string;

    constructor(
        private _http: HttpClient
    ){
        this.url = global.url;
    }

    create(token, notebook):Observable<any>{
        let json = JSON.stringify(notebook);
        let params = "json="+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);

        return this._http.post(this.url + 'notebook', params, {headers: headers});
    }

    getNotebooks():Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-urlencoded');

        return this._http.get(this.url + 'notebook', {headers: headers});
    }

    getNotebook(id):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-urlencoded');

        return this._http.get(this.url + 'notebook/' +id, {headers: headers});
    }

    update(token, notebook, id):Observable<any>{
        delete notebook.updated_at;
        delete notebook.estate;
        delete notebook.farmer;

        let json = JSON.stringify(notebook);
        let params = "json="+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);

        return this._http.put(this.url + 'notebook/' +id, params, {headers: headers});
    }

    delete(token, id){
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);

        return this._http.delete(this.url + 'notebook/' +id, {headers: headers});
    }
}