import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-role-register',
  templateUrl: './role-register.component.html',
  styleUrls: ['./role-register.component.css']
})
export class RoleRegisterComponent  {

  constructor(
    private router: Router,
    private userSvc: UserService
  ) { }

  registerStudent() {
    this.router.navigate(['/register']);
    this.userSvc.rol = "student"
  }

  registerTeacher() {
    this.router.navigate(['/register']);
    this.userSvc.rol = "teacher"
  }

}
