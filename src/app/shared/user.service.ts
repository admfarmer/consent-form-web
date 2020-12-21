import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

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
    const _url = `${this.apiUrl}/users`;
    return this.httpClient.get(_url, this.httpOptions).toPromise();
  }

  async select(userCid: any) {
    let info = {
      "userCid": userCid
    }
    const _url = `${this.apiUrl}/users/select`;
    return this.httpClient.post(_url, info, this.httpOptions).toPromise();
  }

  async select_hospcode(userHospcode: any) {
    let info = {
      "userHospcode": userHospcode
    }
    const _url = `${this.apiUrl}/users/select_hospcode`;
    return this.httpClient.post(_url, info, this.httpOptions).toPromise();
  }

  async save(data: object) {
    const _url = `${this.apiUrl}/users/insert`;
    return this.httpClient.post(_url, data, this.httpOptions).toPromise();
  }

  async update(userID: any, data: object) {
    const _url = `${this.apiUrl}/users/update?userID=${userID}`;
    return this.httpClient.put(_url, data, this.httpOptions).toPromise();
  }

  async remove(userID: any) {
    const _url = `${this.apiUrl}/users/remove?userID=${userID}`;
    return this.httpClient.delete(_url, this.httpOptions).toPromise();
  }

}
