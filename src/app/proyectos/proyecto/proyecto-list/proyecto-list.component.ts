import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Proyecto } from 'src/app/entities/modulos/proyecto';
import { Util } from 'src/app/utils/helpers/util';
import { CreateProyectoComponent } from '../modal/create-proyecto/create-proyecto.component';
import { DeleteProyectoComponent } from '../modal/delete-proyecto/delete-proyecto.component';
import { EditProyectoComponent } from '../modal/edit-proyecto/edit-proyecto.component';
import { ViewProyectoComponent } from '../modal/view-proyecto/view-proyecto.component';
import { ProyectoService } from '../services/proyecto.service';

@Component({
  selector: 'app-proyecto-list',
  templateUrl: './proyecto-list.component.html',
  styleUrls: ['./proyecto-list.component.scss']
})
export class ProyectoListComponent implements OnInit {


  public data: any = [];
  public proyecto: any[] = [];
  public proyectoTemp: any[] = [];
  
  public cargando: boolean = true;
  public desde: number = 0;
  public limit: number = 5;
  public formSubmited = false;
  public totalProyecto: number = 0;

  constructor(public proyectoService: ProyectoService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.cargarProyectos();
  }


  statusEntity = [
    {value: 'Nuevo', label: 'Nuevo'},
    {value: 'En curso', label: 'En curso'},
    {value: 'Cerrado', label: 'Cerrado'}
  ]


  cantEntity = [
    {value: 5, label: '5'},
    {value: 10, label: '10'},
    {value: 20, label: '20'}
  ]



  cargarProyectos(){
    this.cargando = true; 
    this.proyectoService.cargarProyectos(this.desde, this.limit)
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


  openCreate(){
    const modalRef = this.modalService.open(CreateProyectoComponent, { size: 'lg', backdrop: 'static' });
      modalRef.result.then(res => {
        this.cargarProyectos();
      })
  }


  openEdit(data: Proyecto) {
    const modalEdit = this.modalService.open(EditProyectoComponent, { size: 'lg', backdrop: 'static' })
    modalEdit.componentInstance.proyecto = data
    modalEdit.result.then(res => {
      // this.dataSource.updateTable(this.paginator.pageIndex)
      this.cargarProyectos();
    })
  }

  openView(data: Proyecto) {
    const modalEdit = this.modalService.open(ViewProyectoComponent, { size: 'xl', backdrop: 'static' })
    modalEdit.componentInstance.proyecto = data
    modalEdit.result.then(res => {
      // this.dataSource.updateTable(this.paginator.pageIndex)
      this.cargarProyectos();
    })
  }

  openDelete(data: Proyecto) {
    const deleteModal = this.modalService.open(DeleteProyectoComponent, { size: 'lg', backdrop: 'static' })
    deleteModal.componentInstance.proyecto = data
    deleteModal.result.then(res => {
      // this.dataSource.updateTable(this.paginator.pageIndex)
      this.cargarProyectos();
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


  export(){
    this.proyectoService.export()
        .subscribe(res => { Util.download(res['data'], 'proyectos'); console.log(res)});
  }


  buscar(termino: string) {
    if(termino.length === 0 ) {
      return this.proyecto = this.proyectoTemp;
    }
    this.proyectoService.buscar('proyecto', termino)
    .subscribe(resultados => {
      this.proyecto = resultados;
    });
  }
 


  selectStatus(value){
    this.proyectoService.getByStatus({ "estado":  value}).subscribe(data => {
      console.log(data)
      // console.log("cargo editar")
      // this.proyectoService.fillForm = data['proyecto'][0]
      // this.formLoaded = true
    })
  }



  changeCantValidators($res: MatSelectChange){
    if(!$res.value ) {
      // return this.proyecto = this.proyectoTemp;
      return this.cargarProyectos();
    }

    this.limit = $res.value;
    console.log(this.desde)
    // this.cargarProyectos();

    this.cargando = true; 
    this.proyectoService.cargarProyectos(this.desde,  $res.value)
    .subscribe(({total, proyecto}) => {
        this.totalProyecto = total;
        // if(proyecto.length !== 0) { 
          this.proyecto = proyecto;
        //   console.log(proyecto);
          // this.proyectoTemp = proyecto;
        // }
        this.cargando = false;
    })



  }
  
  

  changePwValidators($res: MatSelectChange){
    // console.log($res.value)

    if(!$res.value ) {
      // return this.proyecto = this.proyectoTemp;
      return this.cargarProyectos();
    }


    // this.proyectoService.buscar('proyecto', termino)
    // .subscribe(resultados => {
    //   this.proyecto = resultados;
    // });


    this.proyectoService.getByStatus({ "estado":  $res.value}).subscribe(data => {
      console.log(data['proyecto'])
      this.proyecto = data['proyecto'];
      // console.log("cargo editar")
      // this.proyectoService.fillForm = data['proyecto'][0]
      // this.formLoaded = true
    })
  }


 


}
