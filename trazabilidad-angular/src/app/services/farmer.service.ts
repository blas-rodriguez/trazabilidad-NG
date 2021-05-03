import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Farmer } from '../models/farmer';
import { global } from './global';

@Injectable()
export class FarmerService {
  public url: string;

  constructor(
    private _http: HttpClient
  ){
    this.url = global.url;
  }

  create(token, farmer):Observable<any>{
    let json = JSON.stringify(farmer);
    let params = "json="+json; console.log(params); 

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                   .set('Authorization', token);

    return this._http.post(this.url + 'farmer', params, {headers: headers});

  }

  getFarmers():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');

    return this._http.get(this.url + 'farmer', {headers: headers});
  }

  getFarmer(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this._http.get(this.url + 'farmer/' +id, {headers: headers});
  }

  update(token, farmer, id):Observable<any>{
    delete farmer.zone;
    delete farmer.updated_at;

    let json = JSON.stringify(farmer);
    let params = "json="+json;

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                   .set('Authorization', token);

    return this._http.put(this.url + 'farmer/' +id, params, {headers: headers});
  }

  delete(token,id){
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                   .set('Authorization', token);

    return this._http.delete(this.url + 'farmer/' + id, {headers: headers});
  }
}
