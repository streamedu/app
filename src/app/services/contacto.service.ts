import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  constructor(private http: HttpClient) { }

  sendMessage(body: any) {
    return this.http.post('https://7xdxpd88x8.execute-api.us-east-1.amazonaws.com/contacto', body);
    }
}
