import { Component, Input } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-option',
  templateUrl: './student-option.component.html',
  styleUrls: ['./student-option.component.css']
})
export class StudentOptionComponent {
  @Input() student!: User;

  constructor(private router: Router) { 

  }

  statistics() {
    this.router.navigate(['/estadisticas-alumno']);
  }
}
