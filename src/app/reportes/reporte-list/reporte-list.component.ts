import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Proyecto } from 'src/app/entities/modulos/proyecto';
import { Reporte } from 'src/app/entities/modulos/reporte';
import { ProyectoService } from 'src/app/proyectos/proyecto/services/proyecto.service';
import { ReporteService } from 'src/app/reportes/services/reporte.service';
import { Util } from 'src/app/utils/helpers/util';
import { PrintReportComponent } from '../modal/print-report/print-report.component';
import { DatePipe } from '@angular/common';
import { ClienteService } from 'src/app/proyectos/cliente/services/cliente.service';
import { EmpleadoService } from 'src/app/empleados/empleado/services/empleado.service';





@Component({
  selector: 'app-reporte-list',
  templateUrl: './reporte-list.component.html',
  styleUrls: ['./reporte-list.component.scss']
})
export class ReporteListComponent implements OnInit {



  public data: any = [];
  public proyecto: any[] = [];
  public reporte: any[] = [];
  public reporteProyecto: any[] = [];


  public proyectoTemp: any[] = [];
  
  public cargando: boolean = true;
  public desde: number = 0;
  public formSubmited = false;
  public totalProyecto: number = 0;


  // range: {
  //   fecha_inicio:  "2022-11-04 00:00:00",
  //   fecha_fin: "2022-11-04 23:59:59"
  // }


  dateRange = new FormGroup({
    fecha_inicio: new FormControl('', [Validators.required]),
    fecha_fin: new FormControl('', [Validators.required])
  });


  dateRangeProyecto = new FormGroup({
    fecha_inicio: new FormControl('', [Validators.required]),
    fecha_fin: new FormControl('', [Validators.required])
  });

  public clientex: any [] = []; 
  public proyectox: any [] = []; 

  public totalHorasTrabajadas = 0;
  public pagoResponsable = 0;
  public prepuestoProyecto = 0;

  public pagoTotalPersonal = 0;
  public gananciasProyecto = 0;


  constructor(public proyectoService: ProyectoService,
    private modalService: NgbModal,
    public reportService: ReporteService,
    public clienteService: EmpleadoService) { }


  ngOnInit(): void {
    this.cargarProyectos();

    this.cargarCliente();
    this.cargarProyectos123();

  }


  actualizar(){
    this.reporte = [];
  }


  actualizarProyecto(){
    this.reporteProyecto = [];
  }

  calc(){
    this.pagoTotalPersonal = this.pagoResponsable * this.totalHorasTrabajadas;
    this.gananciasProyecto = this.prepuestoProyecto - this.pagoTotalPersonal;
  }

  cargarCliente(){
    this.clienteService.export().subscribe(resp => {
      console.log(resp)
      this.clientex = resp['data']
    })
  }

  cargarProyectos123(){
    this.proyectoService.export()
        .subscribe(resp => { 
          this.proyectox = resp['data']

        });
  }

  calcular(){

    if (this.dateRange.valid) {
      let start = new Date(Date.parse(this.dateRange.get('fecha_inicio').value))
      let end = new Date(Date.parse(this.dateRange.get('fecha_fin').value))

      let startStr = new DatePipe('en').transform(start, 'yyyy-MM-dd') + ' 00:00:00';
      // let startStr = new Intl.DateTimeFormat('en-US', { year: 'numeric',  month: '2-digit', day: '2-digit'}).format(start) + ' 00:00:00'
      let endStr = new DatePipe('en').transform(end, 'yyyy-MM-dd') + ' 23:59:59';
      // let endStr = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit'  }).format(end) + ' 23:59:59'
      this.dateRange.get('fecha_inicio')?.setValue(startStr)
      this.dateRange.get('fecha_fin')?.setValue(endStr)
      
      console.log(startStr);

      

      this.reportService.showReport(this.dateRange.value)
      .subscribe(res => {  
        this.reporte = res['data']; 
        console.log(res['data']);
        this.totalHorasTrabajadas = res['data'].reduce((sum, value) => (typeof value.horas == "number" ? sum + value.horas : sum), 0);
        console.log('CANTIDAD DE HORAS TRABAJDAS');
        console.log(this.totalHorasTrabajadas);
      
      })
    }
  }





  calcularProyecto(){

    if (this.dateRangeProyecto.valid) {
      let start = new Date(Date.parse(this.dateRangeProyecto.get('fecha_inicio').value))
      let end = new Date(Date.parse(this.dateRangeProyecto.get('fecha_fin').value))

      let startStr = new DatePipe('en').transform(start, 'yyyy-MM-dd') + ' 00:00:00';
      // let startStr = new Intl.DateTimeFormat('en-US', { year: 'numeric',  month: '2-digit', day: '2-digit'}).format(start) + ' 00:00:00'
      let endStr = new DatePipe('en').transform(end, 'yyyy-MM-dd') + ' 23:59:59';
      // let endStr = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit'  }).format(end) + ' 23:59:59'
      this.dateRangeProyecto.get('fecha_inicio')?.setValue(startStr)
      this.dateRangeProyecto.get('fecha_fin')?.setValue(endStr)
      
      console.log(startStr);

      

      this.reportService.showRangeProyecto(this.dateRangeProyecto.value)
      .subscribe(res => {  
        this.reporteProyecto = res['data']; 
        console.log(res['data']);
        // this.totalHorasTrabajadas = res['data'].reduce((sum, value) => (typeof value.horas == "number" ? sum + value.horas : sum), 0);
        // console.log('CANTIDAD DE HORAS TRABAJDAS');
        // console.log(this.totalHorasTrabajadas);
      
      })
    }
  }

  formatDecimales2(numero){
    return parseFloat(Number(numero).toFixed(2));
  }

  responsableChange($event) {
    console.log($event.value)
    this.pagoResponsable = $event.value;
  }

  proyectoChange($event) {
    console.log($event.value)
    this.prepuestoProyecto = $event.value;
  }





  cargarProyectos(){
    this.cargando = true; 
    this.proyectoService.cargarProyectos(this.desde)
    .subscribe(({total, proyecto}) => {
        this.totalProyecto = total;
        if(proyecto.length !== 0) { 
          this.proyecto = proyecto;
          console.log(proyecto);
          this.proyectoTemp = proyecto;
        }
        this.cargando = false;
    })
  }

  cambiarPagina( valor: number) {
    this.desde += valor;
    if(this.desde <0 ) {
      this.desde = 0;
    } else if (this.desde > this.totalProyecto) {
      this.desde -= valor;
    }
    this.cargarProyectos();
  }



  openPrint(data: Proyecto) {
    const modalEdit = this.modalService.open(PrintReportComponent, { size: 'lg', backdrop: 'static' })
    modalEdit.componentInstance.proyecto = data
    modalEdit.result.then(res => {
      // this.dataSource.updateTable(this.paginator.pageIndex)
      this.cargarProyectos();
    })
  }


}
