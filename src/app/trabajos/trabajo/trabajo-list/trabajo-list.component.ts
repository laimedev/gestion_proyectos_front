import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Trabajo } from 'src/app/entities/modulos/trabajo';
import { Util } from 'src/app/utils/helpers/util';
import { CreateTrabajoComponent } from '../modal/create-trabajo/create-trabajo.component';
import { DeleteTrabajoComponent } from '../modal/delete-trabajo/delete-trabajo.component';
import { EditTrabajoComponent } from '../modal/edit-trabajo/edit-trabajo.component';
import { TrabajoService } from '../services/trabajo.service';

@Component({
  selector: 'app-trabajo-list',
  templateUrl: './trabajo-list.component.html',
  styleUrls: ['./trabajo-list.component.scss']
})
export class TrabajoListComponent implements OnInit {

  
  public data: any = [];
  public trabajo: any[] = [];
  public trabajoTemp: any[] = [];
  
  public cargando: boolean = true;
  public desde: number = 0;
  public formSubmited = false;
  public totalTrabajo: number = 0;

  constructor(public trabajoService: TrabajoService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.cargarTrabajos();
  }


  cargarTrabajos(){
    this.cargando = true; 
    this.trabajoService.cargarTrabajos(this.desde)
    .subscribe(({total, trabajo}) => {
        this.totalTrabajo = total;
        if(trabajo.length !== 0) { 
          this.trabajo = trabajo;
          console.log(trabajo);
          this.trabajoTemp = trabajo;
        }
        this.cargando = false;
    })
  }


  openCreate(){
    const modalRef = this.modalService.open(CreateTrabajoComponent, { size: 'lg', backdrop: 'static' });
      modalRef.result.then(res => {
        this.cargarTrabajos();
      })
  }


  openEdit(data: Trabajo) {
    const modalEdit = this.modalService.open(EditTrabajoComponent, { size: 'lg', backdrop: 'static' })
    modalEdit.componentInstance.trabajo = data
    modalEdit.result.then(res => {
      this.cargarTrabajos();
    })
  }

  openDelete(data: Trabajo) {
    const deleteModal = this.modalService.open(DeleteTrabajoComponent, { size: 'lg', backdrop: 'static' })
    deleteModal.componentInstance.trabajo = data
    deleteModal.result.then(res => {
      this.cargarTrabajos();
    })
  }

  cambiarPagina( valor: number) {
    this.desde += valor;
    if(this.desde <0 ) {
      this.desde = 0;
    } else if (this.desde > this.totalTrabajo) {
      this.desde -= valor;
    }
    this.cargarTrabajos();
  }


  export(){
    this.trabajoService.export()
        .subscribe(res => { Util.download(res['data'], 'trabajos'); console.log(res)});
  }


  buscar(termino: string) {

    
    if(termino.length === 0 ) {
      return this.trabajo = this.trabajoTemp;
    }
    this.trabajoService.buscar('trabajo', termino)
    .subscribe(resultados => {
      this.trabajo = resultados;
    });
  }
  


}
