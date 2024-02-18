import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment/Global'; 

@Injectable({
  providedIn: 'root'
})
export class Chatbot {
  apiUrl = 'URL_DE_TU_API'; 

  constructor(private http: HttpClient) {}

  enviarMensaje(mensaje: string): Observable<any> {
    const datos = {
      usuario: environment.nombre_usuario,
      preguntas: [],
      respuestas: [mensaje],
      fecha: new Date().toLocaleDateString() 
    };

    return this.http.post<any>(`${this.apiUrl}/ruta_de_tu_api`, datos);
  }
}
