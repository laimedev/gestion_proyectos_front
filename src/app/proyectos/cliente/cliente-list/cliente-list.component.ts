import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Empleado } from 'src/app/entities/modulos/empleado';
import { CreateClienteComponent } from '../modal/create-cliente/create-cliente.component';
import { DeleteClienteComponent } from '../modal/delete-cliente/delete-cliente.component';
import { EditClienteComponent } from '../modal/edit-cliente/edit-cliente.component';
import { ClienteService } from '../services/cliente.service';


@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.scss']
})
export class ClienteListComponent implements OnInit {

  public data: any = [];


  public cliente: any[] = [];
  public clienteTemp: any[] = [];
  
  public cargando: boolean = true;
  public desde: number = 0;
  public formSubmited = false;
  public totalCliente: number = 0;

  constructor(public clienteService: ClienteService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.cargarCliente();
  }


  cargarCliente(){
    this.cargando = true; 
    this.clienteService.cargarClientes(this.desde)
    .subscribe(({total, cliente}) => {
        this.totalCliente = total;
        if(cliente.length !== 0) { 
          this.cliente = cliente;
          console.log(cliente);
          this.clienteTemp = cliente;
        }
        this.cargando = false;
    })
  }


  openCreate(){
    const modalRef = this.modalService.open(CreateClienteComponent, { size: 'lg', backdrop: 'static' });
      modalRef.result.then(res => {
        this.cargarCliente();
      })
  }


  openEdit(data: Empleado) {
    const modalEdit = this.modalService.open(EditClienteComponent, { size: 'lg', backdrop: 'static' })
    modalEdit.componentInstance.cliente = data
    modalEdit.result.then(res => {
      this.cargarCliente();
    })
  }

  openDelete(data: Empleado) {
    const deleteModal = this.modalService.open(DeleteClienteComponent, { size: 'lg', backdrop: 'static' })
    deleteModal.componentInstance.cliente = data
    deleteModal.result.then(res => {
      this.cargarCliente();
    })
  }

  cambiarPagina( valor: number) {
    this.desde += valor;
    if(this.desde <0 ) {
      this.desde = 0;
    } else if (this.desde > this.totalCliente) {
      this.desde -= valor;
    }
    this.cargarCliente();
  }

}
