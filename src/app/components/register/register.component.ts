import { Component, OnInit, ChangeDetectionStrategy, SimpleChanges, Input, ViewChild } from '@angular/core';
import { NgbModal, NgbModalConfig, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

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

}
