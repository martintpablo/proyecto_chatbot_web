import { Component } from '@angular/core';
import { StudentService } from 'src/services/student.service';

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.css']
})
export class ListaAlumnosComponent {

  constructor(
    private userData:StudentService
  ) {

  }


  getStudent() {
    return this.userData.user$;
  }

}
