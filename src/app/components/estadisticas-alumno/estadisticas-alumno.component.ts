import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChartOptions } from 'chart.js';
import Chart from 'chart.js/auto';

import 'ion-rangeslider';


@Component({
  selector: 'app-estadisticas-alumno',
  templateUrl: './estadisticas-alumno.component.html',
  styleUrls: ['./estadisticas-alumno.component.css']
})
export class EstadisticasAlumnoComponent {

  constructor(private router: Router) {

  }

  rangeValues = { lower: 0, upper: 100 };

  ngOnInit() {
    
    const dataMessages = {
      labels: ['10/2/2024', '11/2/2024', '12/2/2024', '13/2/2024', '14/2/2024', '15/2/2024'],
      datasets: [{
        data: [12, 19, 3, 5, 2, 3], 
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 1
      }]
    };
  
    const optionsMessages: ChartOptions<'line'> = {
      scales: {
        y: {
          beginAtZero: true
        }
      },
      plugins: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'Mensajes por Fecha'
        }
      }
    };
    
  
    const messagePerDate = document.getElementById('messagePerDateChart') as HTMLCanvasElement;
    const messagePerDateChart = new Chart(messagePerDate, {
      type: 'line',
      data: dataMessages,
      options: optionsMessages
    });
  
  
    const dataFeelings = {
      labels: ['0-1', '1-2', '2-3', '3-4', '4-5'],
      datasets: [{
        data: [12, 19, 3, 5, 2]
      }]
    };
  
    const optionsFeelings: ChartOptions<'doughnut'> = {
      scales: {
        y: {
          beginAtZero: true
        }
      },
      plugins: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'Sentimientos'
        }
      }
    };
  
    const feelings = document.getElementById('feelingsChart') as HTMLCanvasElement;
    const feelingsChart = new Chart(feelings, {
      type: 'doughnut', 
      data: dataFeelings,
      options: optionsFeelings
    });
  }

  onRangeChange(event: CustomEvent) {
    this.rangeValues = event.detail.value;
  }

  profile() {
    
  }

  toChat() {
    this.router.navigate(['/chat']);
  }
}
