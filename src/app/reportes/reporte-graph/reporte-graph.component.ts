import { Component, OnInit } from '@angular/core';


import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Color, Label } from 'ng2-charts';
import { Proyecto } from 'src/app/entities/modulos/proyecto';
import { ProyectoService } from 'src/app/proyectos/proyecto/services/proyecto.service';

@Component({
  selector: 'app-reporte-graph',
  templateUrl: './reporte-graph.component.html',
  styleUrls: ['./reporte-graph.component.scss']
})
export class ReporteGraphComponent implements OnInit {

  public proyecto: Proyecto[] = [];



  public barChartOptionsL: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{ ticks: {
      beginAtZero: true
    } }], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartTypeL: ChartType = 'bar';
  public barChartTypeL2: ChartType = 'line';
  public barChartLegendL = false;
  // public barChartPluginsL = [pluginDataLabels];

  public barChartLabelsL: Label[] = [];
  public barChartDataL: ChartDataSets[] = [
    { data: [], label: 'Humedo', backgroundColor: 'linear-gradient(to right, #4185d3 0%, #59A9F3  51%, #59A9F3  100%)' },
    // { data: [28, 48, 40, 19, 86, 27, 90], label: 'Seco',  backgroundColor: 'rgb(119, 255, 134)' },
    // { data: [28, 48, 30, 19, 82, 30, 80], label: 'Agricultores', backgroundColor: 'rgb(129, 236, 255)' },
  ];

  public lineChartType = 'bar';
  public lineChartLegend = true;
  public barChartPlugins = [pluginDataLabels];
  public lineChartColors: Color[] = [
    {
      backgroundColor: [
        'rgb(183, 159, 159)',
        'rgb(183, 159, 159)',
        'rgb(183, 159, 159)',
      ],
      borderColor: [
        // 'rgba(54, 162, 235, 1)',
      ],
      borderWidth: 1
    },
  ];

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    legend: {
      labels: {fontColor: '#879688'}
    },
    scales: {
      xAxes: [{
        ticks: {fontColor: '#879688'},
        gridLines: {color: '#A3A3A3'}
      }],
      yAxes: [{
        ticks: {fontColor: '#879688'},
        gridLines: {color: '#A3A3A3'}
      }]
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        // align: 'end',
      }
    }
  };


  public fechas: any[] = [];
  public titulo: any[] = [];
  public presupuesto: any[] = [];

  constructor(public proyectoService: ProyectoService) { }

  ngOnInit(): void {
    this.cargarProyectos();
  }



  cargarProyectos(){
    this.proyectoService.export()
    .subscribe((proyecto) => {
        this.proyecto = proyecto['data'];
        this.presupuesto = this.proyecto.map(item => (item.presupuesto));
        this.titulo = this.proyecto.map(item => (item.nombre));
        this.fechas = this.proyecto.map(item => (item.created.substr(0,10)))
        this.barChartLabelsL = this.fechas;
        this.barChartDataL = [
          { data: this.presupuesto, label:  '' ,backgroundColor: 'rgb(89, 169, 243)', hoverBackgroundColor: 'rgb(89, 169, 243)'  },
        ];
    })
  }


}
