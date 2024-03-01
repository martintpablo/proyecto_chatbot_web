import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent {

  constructor(
    private userSvc: UserService,
    private router: Router) { }

  
  login(email: string, password: string) {
    this.userSvc.login(email, password)
    
    if (this.userSvc.currentUser?.role == "teacher") {
      this.router.navigate(['/chat']);
    } else {
      this.router.navigate(['/estadisticas-profesor']);
    }
  }
}
