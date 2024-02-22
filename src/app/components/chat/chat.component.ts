import { Component, ViewChild, OnInit } from '@angular/core';
import { environment } from 'src/app/environment/Global';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  fechaDeHoy: Date = new Date();
  i = 0
  j = 0
  id: string = "";
  preguntas: string[] = [];
  respuestas: string[] = [];
  @ViewChild('inputText') inputText: any;
  mensajes: any[] = [];
  pregunta: string = "¡Hola! Soy STAC. Tengamos una pequeña conversación para comprobar cómo te sientes.";
  responder: boolean = false;
  aparece: boolean = false;
  elementosHTML: String[] = [];
  @ViewChild('chatScroll') chatScroll!: any;

  constructor(private router: Router, private http: HttpClient) {

  }

  bringQuestions() {
    this.http.get("http://localhost:8000/api/chatbot/preguntas").subscribe({
      next: (response: any) => {
        this.preguntas = response.preguntas;
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  toStats() {
    this.router.navigate(['/estadisticas-alumno']);
  }

  esDiaAnterior(): boolean {
    const fechaDeAyer = new Date(this.fechaDeHoy);
    fechaDeAyer.setDate(this.fechaDeHoy.getDate() - 1);
    return this.mensajes[0].fecha < fechaDeAyer;
  }


  ngOnInit(): void {
    this.bringQuestions()
    this.setBot();
  }

  setBot() {
    const preg = {
      usuario: "STAC",
      texto: this.pregunta,
      fecha: this.formatDate(this.fechaDeHoy),
      userMessage: true
    };
    this.mensajes.push(preg)
  }


  enviarDatos(inputValue: string) {
    const pregunta = this.pregunta; 
    const respuesta = inputValue; 

    const datos = {
      usuario: environment["nombre_usuario"],
      preguntas: this.preguntas.concat(pregunta), 
      
      respuestas: this.respuestas.concat(respuesta),
      fecha: this.formatDate(this.fechaDeHoy)
    };

    this.respuestas.push(inputValue);
    this.inputText.nativeElement.value = '';

    const mensaje = {
      usuario: environment["nombre_usuario"] != "" ? environment["nombre_usuario"] : "Alumno",
      texto: inputValue,
      fecha: this.formatDate(this.fechaDeHoy),
      userMessage: true
    };

    this.mensajes.push(mensaje);
    this.setBot();
    this.responder = true;
    this.inputText.nativeElement.value = '';
    this.scrollToBottom();

    if (this.i < this.preguntas.length) {
      this.pregunta = this.preguntas[this.i][this.j]

      if (this.j < this.preguntas[this.i].length - 1) {
        this.j = this.j + 1
      } else {
        this.i = this.i + 1
        this.j = 0
      }
    } else {
      this.pregunta = "¡¡¡Gracias por participar!!! A continuación tendrás los resultados de las respuestas Mi trabajo aquí ha terminado, hasta la próxima...🖐️🖐️"
    }
  }

  public aparicionBarra(): boolean {
    var fechaHoyFormateada = this.formatDate(this.fechaDeHoy)
    
    if (this.mensajes.length > 0 && this.mensajes[this.mensajes.length - 1].fecha != fechaHoyFormateada && this.aparece == false && this.responder == true) {
      this.aparece = true;
      this.elementosHTML = ["<hr class='barras'>", "<p class='fecha-chat'>" + this.fechaDeHoy.getDate() + "/" + (this.fechaDeHoy.getMonth() + 1) + "/" + this.fechaDeHoy.getFullYear() + "</p>", "<hr class='barras'>"];
      return true;
    } else {
      return false;

    }
  }

  private formatDate(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  scrollToBottom(): void {
    this.chatScroll.nativeElement.scrollTop = this.chatScroll.nativeElement.scrollHeight;
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }
}
