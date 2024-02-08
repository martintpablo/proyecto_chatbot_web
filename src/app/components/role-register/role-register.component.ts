import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-role-register',
  templateUrl: './role-register.component.html',
  styleUrls: ['./role-register.component.css']
})
export class RoleRegisterComponent  {

  constructor(private router: Router) { }

  register() {
    this.router.navigate(['/register']);
  }

}
