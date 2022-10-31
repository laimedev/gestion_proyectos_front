import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Departamento } from 'src/app/entities/modulos/departamento';
import { Proyecto } from 'src/app/entities/modulos/proyecto';
import { Util } from 'src/app/utils/helpers/util';
import { CreateDepartamentoComponent } from '../modal/create-departamento/create-departamento.component';
import { DeleteDepartamentoComponent } from '../modal/delete-departamento/delete-departamento.component';
import { EditDepartamentoComponent } from '../modal/edit-departamento/edit-departamento.component';
import { DepartamentoService } from '../services/departamento.service';

@Component({
  selector: 'app-departamento-list',
  templateUrl: './departamento-list.component.html',
  styleUrls: ['./departamento-list.component.scss']
})
export class DepartamentoListComponent implements OnInit {

  public data: any = [];
  public departamento: any[] = [];
  public departamentoTemp: any[] = [];
  
  public cargando: boolean = true;
  public desde: number = 0;
  public formSubmited = false;
  public totalDepartamento: number = 0;

  constructor(public departamentoService: DepartamentoService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.cargarDepartamentos();
  }


  cargarDepartamentos(){
    this.cargando = true; 
    this.departamentoService.cargarDepartamento(this.desde)
    .subscribe(({total, departamento}) => {
        this.totalDepartamento = total;
        if(departamento.length !== 0) { 
          this.departamento = departamento;
          console.log(departamento);
          this.departamentoTemp = departamento;
        }
        this.cargando = false;
    })
  }


  openCreate(){
    const modalRef = this.modalService.open(CreateDepartamentoComponent, { size: 'lg', backdrop: 'static' });
      modalRef.result.then(res => {
        this.cargarDepartamentos();
      })
  }


  openEdit(data: Departamento) {
    const modalEdit = this.modalService.open(EditDepartamentoComponent, { size: 'lg', backdrop: 'static' })
    modalEdit.componentInstance.departamento = data
    modalEdit.result.then(res => {
      // this.dataSource.updateTable(this.paginator.pageIndex)
      this.cargarDepartamentos();
    })
  }

  openDelete(data: Departamento) {
    const deleteModal = this.modalService.open(DeleteDepartamentoComponent, { size: 'lg', backdrop: 'static' })
    deleteModal.componentInstance.departamento = data
    deleteModal.result.then(res => {
      // this.dataSource.updateTable(this.paginator.pageIndex)
      this.cargarDepartamentos();
    })
  }

  cambiarPagina( valor: number) {
    this.desde += valor;
    if(this.desde <0 ) {
      this.desde = 0;
    } else if (this.desde > this.totalDepartamento) {
      this.desde -= valor;
    }
    this.cargarDepartamentos();
  }


  export(){
    this.departamentoService.export()
        .subscribe(res => { Util.download(res['data'], 'departamentos'); console.log(res)});
  }


  buscar(termino: string) {
    if(termino.length === 0 ) {
      return this.departamento = this.departamentoTemp;
    }
    this.departamentoService.buscar('departamento', termino)
    .subscribe(resultados => {
      this.departamento = resultados;
    });
  }


}
