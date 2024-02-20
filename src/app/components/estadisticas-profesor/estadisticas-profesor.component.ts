import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChartOptions } from 'chart.js';
import Chart from 'chart.js/auto';
import { StudentService } from 'src/services/student.service';

@Component({
  selector: 'app-estadisticas-profesor',
  templateUrl: './estadisticas-profesor.component.html',
  styleUrls: ['./estadisticas-profesor.component.css']
})
export class EstadisticasProfesorComponent {
  
  constructor(
    private router: Router,
    private userData:StudentService
    ) {

  }

  rangeValues = { lower: 0, upper: 100 };

  ngOnInit() {
    
    
  
    const dataFeelings = {
      labels: ['0-1', '1-2', '2-3', '3-4', '4-5'],
      datasets: [{
        data: [12, 19, 3, 5, 2]
      }]
    };
  
    const optionsFeelings: ChartOptions<'bar'> = {
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
          text: 'Sentimientos Generales'
        }
      }
    };
  
    const feelings = document.getElementById('feelingsChart') as HTMLCanvasElement;
    const feelingsChart = new Chart(feelings, {
      type: 'bar', 
      data: dataFeelings,
      options: optionsFeelings
    });

    var dataGenderFeelings = {
      labels: ['0-1', '1-2', '2-3', '3-4', '4-5'],
      datasets: [
        {
          label: 'Dataset 1',
          data: [3, 2, 5, 7, 4], 
          stack: 'Stack 0',
        },
        {
          label: 'Dataset 2',
          data: [4, 5, 3, 6, 2], 
          stack: 'Stack 1',
        },
        {
          label: 'Dataset 3',
          data: [0, 1, 0, 2, 3], 
          stack: 'Stack 2',
        },
        {
          label: 'Dataset 4',
          data: [2, 3, 1, 4, 5], 
          stack: 'Stack 3',
        },
      ]
    };

    var optionsGenderFeelings = {
      scales: {
        y: {
          beginAtZero: true
        }
      },
      plugins: {
        legend: {
          display: true
        },
        title: {
          display: true,
          text: 'Sentimientos por Género'
        }
      }
    };

    var gender = document.getElementById('feelingsPerGender') as HTMLCanvasElement;
    var feelingsPerGender = new Chart(gender, {
      type: 'bar',
      data: dataGenderFeelings,
      options: optionsGenderFeelings
    });

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

    const dataSentences = {
      labels: ['Positive', 'Negative', 'Neutral'],
      datasets: [{
        data: [12, 19, 3]
      }]
    };
  
    const optionsSentences: ChartOptions<'doughnut'> = {
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
          text: 'Valor de las Frases Enviadas'
        }
      }
    };
  
    const sentences = document.getElementById('sentencesChart') as HTMLCanvasElement;
    const sentencesChart = new Chart(sentences, {
      type: 'doughnut', 
      data: dataSentences,
      options: optionsSentences
    });
  }

  onRangeChange(event: CustomEvent) {
    this.rangeValues = event.detail.value;
  }

  profile() {
    
  }

  getClasses() {
    return this.userData.user$;
  }
}
