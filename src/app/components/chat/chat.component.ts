import { Component, ViewChild, OnInit } from '@angular/core';
import { environment } from 'src/app/environment/Global';
import { Router } from '@angular/router';
// import { Chatbot } from 'src/services/chatbot.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  fechaDeHoy: Date = new Date();
  fechaDeAyer: Date = new Date();
  id: string = "";
  preguntas: string[] = [];
  respuestas: string[] = [];
  @ViewChild('inputText') inputText: any;
  mensajes: any[] = [];
  pregunta: string = "Hola soy STAC, ¿qué tal estás?";
  responder: boolean = false;
  aparece: boolean = false;
  elementosHTML: String[] = [];
  
  constructor(private router: Router) {

  }

  toStats() {
    this.router.navigate(['/estadisticas-alumno']);
  }
  // constructor(private chatbotService: Chatbot) { }

  esDiaAnterior(): boolean {
    const fechaDeAyer = new Date(this.fechaDeHoy);
    fechaDeAyer.setDate(this.fechaDeHoy.getDate() - 1);
    return this.mensajes[0].fecha < fechaDeAyer;
  }
  ngOnInit(): void {
    this.fechaDeAyer.setDate(this.fechaDeHoy.getDate() - 1);
    const preg = {
      usuario: "STAC",
      texto: this.pregunta,
      fecha: this.formatDate(this.fechaDeAyer),
      userMessage: true
    };
    this.mensajes.push(preg)
  }


  enviarDatos(inputValue: string) {
    
    const datos = {
      usuario: environment["nombre_usuario"],
      preguntas: [],
      respuestas: [inputValue],
      fecha: this.formatDate(this.fechaDeHoy)
    };

    // this.chatbotService.enviarMensaje(datos).subscribe(response => {
    //   console.log('Respuesta de la API:', response);
    // }, error => {
    //   console.error('Error al enviar el mensaje:', error);
    // });


    this.respuestas.push(inputValue);
    this.inputText.nativeElement.value = '';

    const mensaje = {
      usuario: environment["nombre_usuario"] != "" ? environment["nombre_usuario"] : "Alumno",
      texto: inputValue,
      fecha: this.formatDate(this.fechaDeHoy),
      userMessage: true
    };

    this.mensajes.push(mensaje);
    this.ngOnInit();
    this.responder = true;
    this.inputText.nativeElement.value = '';
  }
  public aparicionBarra(): boolean {
    var fechaHoyFormateada = this.formatDate(this.fechaDeHoy)
    debugger;
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

}
