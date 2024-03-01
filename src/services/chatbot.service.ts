import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment/Global'; 
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class Chatbot {
  apiUrl = 'https://4apyvj5zx4.execute-api.us-east-1.amazonaws.com/prod/'; 

  constructor(private http: HttpClient) {}

  enviarMensaje(mensaje: string): Observable<any> {
    const datos = {
      usuario: environment.nombre_usuario,
      preguntas: [],
      respuestas: [mensaje],
      fecha: new Date().toLocaleDateString() 
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': 'OpmTjbbI0u4qvjDyCODAy17wghfC6jpbAVdHM570'
    });

    return this.http.put<any>(`${this.apiUrl}`, datos, {headers: headers});
  }

 
  recibirMensaje(user: User): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': 'OpmTjbbI0u4qvjDyCODAy17wghfC6jpbAVdHM570'
    });

    return this.http.get<any>(`${this.apiUrl + "?date=user.birthdate&name=user.name"}`, {headers: headers}); // Está mal, modificar
  }
}
