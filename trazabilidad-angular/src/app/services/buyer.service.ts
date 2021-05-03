import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Buyer } from '../models/buyer';
import { global } from './global';

@Injectable()
export class BuyerService {
    public url: string;

    constructor(
        private _http: HttpClient
    ){
        this.url = global.url;
    }

    create(token, buyer):Observable<any>{
        let json = JSON.stringify(buyer);
        let params = "json="+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);

        return this._http.post(this.url + 'buyer', params, {headers: headers});
    }

    getBuyers():Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');

        return this._http.get(this.url + 'buyer', {headers: headers});
    }

    getBuyer(id):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');

        return this._http.get(this.url + 'buyer/' +id, {headers: headers});
    }

    update(token, buyer, id):Observable<any>{
        delete buyer.updated_at;

        let json = JSON.stringify(buyer);
        let params = "json="+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);

        return this._http.put(this.url + 'buyer/' + id, params, {headers: headers});
    }

    delete(token, id){
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);

        return this._http.delete(this.url + 'buyer/' + id, {headers: headers});
    }
}