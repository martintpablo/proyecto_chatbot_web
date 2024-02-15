import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Chatbot {
  apiUrl = '';

  constructor(private http: HttpClient) {}

  enviarDatos(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/ruta-api`, data);
  }
}
