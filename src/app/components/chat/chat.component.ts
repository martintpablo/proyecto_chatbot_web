import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  constructor(private router: Router) {

  }

  toStats() {
    this.router.navigate(['/estadisticas-alumno']);
  }
}
