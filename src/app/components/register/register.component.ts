import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginComponentComponent } from '../login-component/login-component.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  mostrarFormulario: boolean = false;

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  //@ViewChild(LoginComponentComponent) modal!: LoginComponentComponent;

  //reg:boolean = false

  //registerChange() {
    //if (this.modal.chosen == true) {
      //this.reg = true
    //}
  //}
}
