import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Propiedad } from '../model/propiedad.model';
import { PropertyService } from '../services/property.service';
import { ProducerService } from '../../services/producer.service';
import { ReporteService } from '../../services/reporte.service';

@Component({
  selector: 'app-propiedad-list',
  templateUrl: './propiedad-list.component.html',
  styleUrls: ['./propiedad-list.component.scss']
})
export class PropiedadListComponent implements OnInit {

  listProducer: any [] = [];
  displayedColumns: string[] = ['idProperty','nameProperty', 'Address', 'Area', 'Altitude', 'Latitud' ,'Longitude', 'Wakers', 'options'];
  dataSource = new MatTableDataSource(this.listProducer);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public latitude;
  public longitude;



  @Output()lat = new EventEmitter<String>();
  @Output()long = new EventEmitter<String>();


  public cargando: boolean = true;
  public desde: number = 0;
  public totalPropiedad : number = 0;
  public propiedad: Propiedad[] = [];
  public ppropiedadTemp: Propiedad[] = [];

  constructor(public propertyService: PropertyService,
              public router: Router,
              private prodService: ProducerService,
              public reporteServices: ReporteService) { }

  ngOnInit(): void {
    // this.propertyService.getAll().subscribe(resp => {
    //   console.log(resp);
    //   this.dataSource = resp;
    // })

    this.cargarPropiedad()
  }


  irForm(){
    this.router.navigate([`admin/property.form/${0}`]);
  }

  irEdit(element){
    this.router.navigate([`admin/property.form/${element._id}`]);
  }

  irGeo(element){
    console.log(element);
    if(element)
    this.router.navigate([`admin/property.geo/${element._id}`]);
    // this.lat.emit(element.idProperty)
    // this.long.emit(element.Longitude)
  }



  cargarPropiedad(){
    this.cargando = true; 
    this.prodService.cargarPropiedades(this.desde)
    .subscribe(({total, propiedad}) => {
        this.totalPropiedad = total;
        if(propiedad.length !== 0) { 
          this.propiedad = propiedad;
          console.log(propiedad);
          this.ppropiedadTemp = propiedad;
        }
        this.cargando = false;
    })
  }


  cargarTodo(){
    Swal.fire({
      title: 'Deseas exportar propiedades?',
      text: `La exportacion sera descargada en formato xls.` ,
      icon: 'warning',
      confirmButtonColor: '#045bfc',
      cancelButtonColor: '#ff6c04',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      confirmButtonText: 'Si, descargar!'
    }).then((result) => {
      if (result.value) {
        this.prodService.cargarPropiedadesTodo()
        .subscribe(resp => {
          this.reporteServices.exportAsExcelFile(resp.propiedad, 'reporte');
        })
      }
    })
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




  cambiarPagina( valor: number) {
    this.desde += valor;
    if(this.desde <0 ) {
      this.desde = 0;
    } else if (this.desde > this.totalPropiedad) {
      this.desde -= valor;
    }
    this.cargarPropiedad();
  }


  

}
