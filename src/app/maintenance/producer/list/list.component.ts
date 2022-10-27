import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProducerService } from '../services/producer.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Productor } from '../model/productor.model';
import { ReporteService } from '../services/reporte.service';
import { BusquedasService } from '../services/busquedas.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  

  listProducer: any [] = [];
  displayedColumns: string[] = ['id_productor','nombres', 'apellido_p', 'apellido_m', 'sexo', 'dni', 'celular','direcccion' ,'options'];
  dataSource = new MatTableDataSource(this.listProducer);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  sede  = [
    {value: 'Tingo Maria', name: 'Tingo Maria'},
    {value: 'San Alejandro', name: 'San Alejandro'}
  ]


  public formSede = this.fb.group({
    sede: [''],
  });


  dateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });


  public cargando: boolean = true;
  public desde: number = 0;
  public totalProductor: number = 0;
  public productor: Productor[] = [];
  public productorTemp: Productor[] = [];
 
  constructor(private prodService: ProducerService,
              public router: Router,
              public reporteServices: ReporteService,
              public busquedaService: BusquedasService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.prodService.getAll().subscribe(resp => {
      console.log(resp);
      this.dataSource = resp;
    })

    this.cargarProductor();
  }



  cargarTodo(){
    Swal.fire({
      title: 'Deseas exportar productores?',
      text: `La exportacion sera descargada en formato xls.` ,
      icon: 'warning',
      confirmButtonColor: '#045bfc',
      cancelButtonColor: '#ff6c04',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      confirmButtonText: 'Si, descargar!'
    }).then((result) => {
      if (result.value) {
        this.prodService.cargarProductoresTodo()
        .subscribe(resp => {
          this.reporteServices.exportAsExcelFile(resp.productor, 'reporte');
        })
      }
    })
  }

  cargarProductor(){
    this.cargando = true; 
    this.prodService.cargarProductores(this.desde)
    .subscribe(({total, productor}) => {
        this.totalProductor = total;
        if(productor.length !== 0) { 
          this.productor = productor;
          console.log(productor);
          this.productorTemp = productor;
        }
        this.cargando = false;
    })
  }


  cambiarPagina( valor: number) {
    this.desde += valor;
    if(this.desde <0 ) {
      this.desde = 0;
    } else if (this.desde > this.totalProductor) {
      this.desde -= valor;
    }
    this.cargarProductor();
  }
  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  verMas(user){
    this.router.navigateByUrl(`admin/producer.form/${user.idProductor}`);
  }



  buscarID(termino: string) {

    if(termino.length === 0 ) {
      return this.productor = this.productorTemp;
    }

    this.busquedaService.buscar('id_productor', termino)
    .subscribe(resultados => {
      this.productor = resultados;
      console.log(this.productor);
    });
  }

  buscarDNI(termino: string) {

    if(termino.length === 0 ) {
      return this.productor = this.productorTemp;
    }

    this.busquedaService.buscar('dni', termino)
    .subscribe(resultados => {
      this.productor = resultados;
      console.log(this.productor);
    });
  }


  buscarSEDE($event: MatSelectChange){
    // console.log($event.value)
    const termino = $event.value;
    if(termino.length === 0 ) {
      return this.productor = this.productorTemp;
    }

    this.busquedaService.buscar('distrito', termino)
    .subscribe(resultados => {
      this.productor = resultados;
      console.log(this.productor);
    });
  }




  irForm(){
    this.router.navigateByUrl(`admin/producer.form/${0}`);
  } 


  irEdit(data){
    this.router.navigate([`admin/producer.form/${data._id}`]);
  }


  delete(){
    Swal.fire({
      title: 'No tiene accesos para esta funcion',
      text: `Comuniquese con el Administrador` ,
      icon: 'error',
      confirmButtonColor: '#045bfc',
      cancelButtonColor: '#ff6c04',
      cancelButtonText: 'Ok',
      showCancelButton: true,
      showConfirmButton: false,
    });
  }


}
