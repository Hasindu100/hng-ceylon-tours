import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  serverUrl = environment.server2Url;

  constructor(private http: HttpClient) { }

  sendEmail(emailObj: any) {
    let url = this.serverUrl + 'send-email';
    return this.http.post(url, emailObj);
  }
}
