import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/app/environment/Global';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent {

  constructor(private router: Router) { }
  login(email: string) {
    environment["nombre_usuario"] = email
    // If the user is a student this is the route he has to follow, if its a teacher, go other
    this.router.navigate(['/chat']);
  }


  //chosen: boolean = false

  //choose() {
  //this.chosen = true
  //}
}
