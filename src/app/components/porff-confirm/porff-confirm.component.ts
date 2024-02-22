import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-porff-confirm',
  templateUrl: './porff-confirm.component.html',
  styleUrls: ['./porff-confirm.component.css']
})
export class PorffConfirmComponent {

  message: string = '';

  constructor(private http: HttpClient) {
    this.refresh();
  }

  ngOnInit(): void {
    this.refresh();
  }

  private refresh() {
    this.http.get("http://localhost:8000/api/chatbot/preguntas").subscribe({
      next: (response: any) => {
        this.message = response.preguntas;
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

}