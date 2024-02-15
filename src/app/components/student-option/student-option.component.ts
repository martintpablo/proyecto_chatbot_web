import { Component, Input } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-student-option',
  templateUrl: './student-option.component.html',
  styleUrls: ['./student-option.component.css']
})
export class StudentOptionComponent {
  @Input() student!: User;

  constructor(
    
  ) { }
}
