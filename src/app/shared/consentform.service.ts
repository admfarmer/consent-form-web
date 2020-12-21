import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConsentFormService {

  token: any;
  httpOptions: any;

  constructor(@Inject('API_URL') private apiUrl: string, private httpClient: HttpClient) {
    this.token = sessionStorage.getItem('token');
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    };
  }

  async list() {
    const _url = `${this.apiUrl}/person`;
    return this.httpClient.get(_url, this.httpOptions).toPromise();
  }

  async select_cid(cid: any) {
    let info = {
      "cid": cid
    }
    const _url = `${this.apiUrl}/person/select_cid`;
    return this.httpClient.post(_url, info, this.httpOptions).toPromise();
  }

  async select_hospcode(hospcode: any) {
    const _url = `${this.apiUrl}/person/select_hospcode?hospcode=${hospcode}`;
    return this.httpClient.get(_url, this.httpOptions).toPromise();
  }

  async save(data: object) {
    const _url = `${this.apiUrl}/person/insert`;
    return this.httpClient.post(_url, data, this.httpOptions).toPromise();
  }

  async update(id: any, data: object) {
    const _url = `${this.apiUrl}/person/update?id=${id}`;
    return this.httpClient.put(_url, data, this.httpOptions).toPromise();
  }

  async remove(id: any) {
    const _url = `${this.apiUrl}/person/remove?id=${id}`;
    return this.httpClient.delete(_url, this.httpOptions).toPromise();
  }

}
