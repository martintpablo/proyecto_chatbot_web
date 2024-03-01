import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoginComponentComponent } from '../login-component/login-component.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form:FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private userSvc: UserService
  ) { 
    this.form = this.formBuilder.group({
      name:["", [Validators.required]],
      rol:[this.userSvc.rol],
      surname:["", [Validators.required]],
      sex:["Seleccione", [Validators.required]],
      email:["", [Validators.required, Validators.email]],
      classes:["", [Validators.required]],
      birthdate:["", [Validators.required]],
      password:["", [Validators.required]],
      confirmPassword:["", Validators.required],
    });
    
  }

  ngOnInit(): void {
    console.log(this.userSvc.rol)
  }
  mostrarFormulario: boolean = false;

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  register() {
    this.userSvc.register(this.form.value);
  }
}
