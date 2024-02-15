import { Component } from '@angular/core';
import { Message } from 'src/app/models/message.model';
import { Chatbot } from 'src/services/chatbot.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  fechaDeHoy: Date = new Date();
  id: string = "";
  preguntas: string[] = [];
  respuestas: string[] = [];

  constructor(private chatbot: Chatbot) {}
  enviarMensaje() {
    const mensaje = this.crearMensaje(this.id, "usuario");
    if (mensaje != null){
      this.agregarPregunta(mensaje);
      this.respuestas.push("Procesando...");
      this.chatbot.enviarMensaje(mensaje).subscribe((response:Message)=>{
        let respuesta = response.text;
        if (!respuesta.endsWith(".") && !respuesta.includes("?")) {
          respuesta += ".";
        }
        this.agregarRespuesta(respuesta);
      });
    } else{
      alert('El campo no puede estar vacío');
    }
    
  }

  crearMensaje(id:string, tipo:string):Message|null {
    const mensaje = new Message();
    mensaje.id=id;
    mensaje.tipo=tipo;
    const textoUsuario = document.getElementById(`input${tipo}`) as HTMLInputElement;
    mensaje.text = textoUsuario.value;
    textoUsuario.value="";
    return (mensaje.text==="" || mensaje.text===undefined)?null:mensaje;
  }
  agregarPregunta(pregunta:Message) {
    const listaPreguntas = document.getElementById("listaPreguntas") as HTMLUListElement;
    const nuevoItem = document.createElement("li");
    const nuevaCelda = document.createElement("div");
    nuevaCelda.className = "celdaContenedor";
    const etiquetaFecha = document.createElement("span");
    etiquetaFecha.innerText = this.formatoFecha(new Date());
    etiquetaFecha.className = "etiquetaFecha";
    const etiquetaTipo = document.createElement("span");
    etiquetaTipo.innerText = `Tu: ${pregunta.tipo}`;
    etiquetaTipo.className = "etiquetaTipo";
    const contenido = document.createTextNode(pregunta.text);
    nuevaCelda.appendChild(etiquetaFecha);
    nuevaCelda.appendChild(document.createElement("br"));
    nuevaCelda.appendChild(etiquetaTipo);
    nuevaCelda.appendChild(contenido);
    nuevaCelda.title = pregunta.text;
    nuevaCelda.onclick = () => this.seleccionarPregunta(nuevaCelda);
    const botonBorrar = document.createElement("button");
    botonBorrar.type = "button";
    botonBorrar.innerHTML = "&times;";
    botonBorrar.className ="botonBorrar";
    botonBorrar.onclick = ()=>this.borrarPregunta(nuevaCelda);
    nuevaCelda.appendChild(botonBorrar);
    const contenedorAcciones = document.createElement("div");
    contenedorAcciones.className = "contenedorAcciones";
    contendorAcciones.appendChild(contedoresAccion[0].crearInstancia().agregarAContenedor(nuevaCelda));
    nuevaCelda.appendChild(contenedorAcciones);
    nuevaFila.appendChild(nuevaCelda);
    // Agregamos el elemento a la lista y actualizamos su posición
    nuevoItem.appendChild(nuevaFila);
    listaPreguntas.insertBefore(nuevoItem, listaPreguntas.firstChild);
  }
  borrarPregunta(elemento:HTMLElement){
    const padre = elemento.parentNode as HTMLElement;
    padre.remove();
    this.actualizarPosiciones();
  }
  seleccionarPregunta(elemento:HTMLElement){
    if (this.elementoSeleccionado != null) {
      this.elementoSeleccionado.classList.remove("seleccionado");
    }
    this.elementoSeleccionado = elemento;
    elemento.classList.add("seleccionado");
  }
  /**
   * Actualiza las posiciones de todas las preguntas en la tabla para que estén correctamente numeradas.
   */
  private actualizarPosiciones(){
    for (let i=1;i<=listaPreguntas.children.length;i++){
      const fila = listaPreguntas.children.item(i-1) as HTMLTableRowElement;
      const celdaNumero = fila.cells.namedItem("numero") as HTMLTableDataCellElement;
      celdaNumero.innerText = i+".";
    }
  }
  
  // enviarDatos() {
  //   const fechaActual = new Date().toLocaleDateString();
  //   const data = {
  //     // usuario: this.userId,
  //     preguntas: this.preguntas,
  //     respuestas: this.respuestas,
  //     fecha: fechaActual
  //   };

  //   this.chatbot.enviarDatos(data).subscribe(response => {
  //     console.log('Respuesta de la API:', response);
  //   }, error => {
  //     console.error('Error al enviar datos a la API:', error);
  //   });
  // }
}
