import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Container } from '../models/container';
import { global } from './global';

@Injectable()
export class ContainerService {
    public url: string;

    constructor(
        private _http: HttpClient
    ){
        this.url = global.url;
    }

    create(token, article):Observable<any>{
        let json = JSON.stringify(article);
        let params = "json="+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);

        return this._http.post(this.url + 'container', params, {headers: headers});
    }

    getContainers():Observable<any>{
        let headers =  new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url + 'container', {headers: headers});
    }

    getContainer(id):Observable<any>{
        let headers =  new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url + 'container/' +id, {headers: headers});
    }

    update(token, container, id):Observable<any>{
        delete container.updated_at;

        let json = JSON.stringify(container);
        let params = "json="+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);

        return this._http.put(this.url + 'container/' +id, params, {headers: headers}); 
    }

    delete(token, id){
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);

        return this._http.delete(this.url + 'container/' +id, {headers: headers});
    }
}