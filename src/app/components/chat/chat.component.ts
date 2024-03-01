import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
  preguntasEnviar: string[] = []
  respuestas: string[] = [];
  @ViewChild('inputText') inputText: any;
  mensajes: any[] = [];
  pregunta: string = "¡Hola! Soy STAC. Tengamos una pequeña conversación para comprobar cómo te sientes. Escribe \"Estoy listo para comenzar\"";
  responder: boolean = false;
  aparece: boolean = false;
  bye: string = "¡¡¡Gracias por participar!!! A continuación tendrás los resultados de las respuestas Mi trabajo aquí ha terminado, hasta la próxima...🖐️🖐️";
  repeat: string = "Por favor, responde con al menos 3 palabras para poder analizar correctamente como te sientes."
  finish: boolean = false;
  elementosHTML: String[] = [];
  cleanResponses: any
  settledResponses: any
  @ViewChild('chatScroll') chatScroll!: any;

  constructor(private router: Router, private http: HttpClient) {

  }

  bringQuestions() {
    this.http.get("http://localhost:8000/api/chatbot/").subscribe({
      next: (response: any) => {
        this.preguntas = response.preguntas;
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  
  sendResponses(responses: Object) {
    let head = new HttpHeaders({'x-api-key':'OpmTjbbI0u4qvjDyCODAy17wghfC6jpbAVdHM570', 'Content-Type':'application/json'});

    this.http.put('https://4apyvj5zx4.execute-api.us-east-1.amazonaws.com/prod/?results="False"', responses, { headers: head }).subscribe({
      next: (response: any) => {
        
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  getCleanResponses() {
    let head = new HttpHeaders({'x-api-key':'OpmTjbbI0u4qvjDyCODAy17wghfC6jpbAVdHM570', 'Content-Type':'application/json'});

    this.http.get('https://4apyvj5zx4.execute-api.us-east-1.amazonaws.com/prod/?results=False&date=29-2-2024&name=Usuario&justOne=True', { headers: head }).subscribe({
      next: (response: any) => {
        this.cleanResponses = response
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  analyzeResponses(responses: Object) {
    this.http.post("http://localhost:8000/api/chatbot/preguntas", responses).subscribe({
      next: (response: any) => {

      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  getAnalyzedResponses() {
    this.http.get("http://localhost:8000/api/chatbot/preguntas").subscribe({
      next: (response: any) => {
        this.settledResponses = response
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  uploadResponses(responses: Object) {
    let head = new HttpHeaders({'x-api-key':'OpmTjbbI0u4qvjDyCODAy17wghfC6jpbAVdHM570', 'Content-Type':'application/json'});

    this.http.put('https://4apyvj5zx4.execute-api.us-east-1.amazonaws.com/prod/?results="True"', responses, { headers: head }).subscribe({
      next: (response: any) => {
        
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
    const lenghtChecker = inputValue.split(" ");

    const pregunta = this.pregunta; 
    const respuesta = inputValue; 

    const datos = {
      usuario: "Usuario",
      preguntas: this.preguntasEnviar.concat(pregunta), 
      respuesta: this.respuestas.concat(respuesta),
      fecha: this.formatDate(this.fechaDeHoy)
    };

    this.preguntasEnviar.push(pregunta);
    this.respuestas.push(inputValue);
    this.inputText.nativeElement.value = '';

    const mensaje = {
      // usuario: environment["nombre_usuario"] != "" ? environment["nombre_usuario"] : "Alumno",
      usuario: "Alumno",
      texto: inputValue,
      fecha: this.formatDate(this.fechaDeHoy),
      userMessage: true
    };

    if (lenghtChecker.length < 3) {
      this.pregunta = this.repeat
    } else {
      if (this.i < this.preguntas.length) {
        this.pregunta = this.preguntas[this.i][this.j]

        if (this.j < this.preguntas[this.i].length - 1) {
          this.j = this.j + 1
        } else {
          this.i = this.i + 1
          this.j = 0
        }
      } else {
        this.pregunta = this.bye
        datos.preguntas.shift()
        datos.respuesta.shift()
        this.sendResponses(datos)
        this.getCleanResponses()
        console.log(this.cleanResponses)
        this.analyzeResponses(this.cleanResponses)
        this.getAnalyzedResponses()
        console.log(this.settledResponses)
        this.uploadResponses(this.settledResponses)
      }
    }

    if (this.pregunta == this.bye) {
      this.finish = true
    }

    this.mensajes.push(mensaje);
    this.setBot();
    this.responder = true;
    this.inputText.nativeElement.value = '';
    this.scrollToBottom();
    console.log(datos)
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
