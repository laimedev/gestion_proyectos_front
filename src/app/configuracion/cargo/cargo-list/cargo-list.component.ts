import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Cargo } from 'src/app/entities/modulos/cargo';
import { CreateCargoComponent } from '../modal/create-cargo/create-cargo.component';
import { DeleteCargoComponent } from '../modal/delete-cargo/delete-cargo.component';
import { EditCargoComponent } from '../modal/edit-cargo/edit-cargo.component';
import { CargoService } from '../services/cargo.service';


@Component({
  selector: 'app-cargo-list',
  templateUrl: './cargo-list.component.html',
  styleUrls: ['./cargo-list.component.scss']
})
export class CargoListComponent implements OnInit {


  public data: any = [];
  public cargo: any[] = [];
  public cargoTemp: any[] = [];
  
  public cargando: boolean = true;
  public desde: number = 0;
  public formSubmited = false;
  public totalCargo: number = 0;

  constructor(public cargoService: CargoService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.cargarCargos();
  }


  cargarCargos(){
    this.cargando = true; 
    this.cargoService.cargarCargo(this.desde)
    .subscribe(({total, cargo}) => {
        this.totalCargo = total;
        if(cargo.length !== 0) { 
          this.cargo = cargo;
          console.log(cargo);
          this.cargoTemp = cargo;
        }
        this.cargando = false;
    })
  }


  openCreate(){
    const modalRef = this.modalService.open(CreateCargoComponent, { size: 'lg', backdrop: 'static' });
      modalRef.result.then(res => {
        this.cargarCargos();
      })
  }


  openEdit(data: Cargo) {
    const modalEdit = this.modalService.open(EditCargoComponent, { size: 'lg', backdrop: 'static' })
    modalEdit.componentInstance.cargo = data
    modalEdit.result.then(res => {
      // this.dataSource.updateTable(this.paginator.pageIndex)
      this.cargarCargos();
    })
  }

  openDelete(data: Cargo) {
    const deleteModal = this.modalService.open(DeleteCargoComponent, { size: 'lg', backdrop: 'static' })
    deleteModal.componentInstance.cargo = data
    deleteModal.result.then(res => {
      // this.dataSource.updateTable(this.paginator.pageIndex)
      this.cargarCargos();
    })
  }

  cambiarPagina( valor: number) {
    this.desde += valor;
    if(this.desde <0 ) {
      this.desde = 0;
    } else if (this.desde > this.totalCargo) {
      this.desde -= valor;
    }
    this.cargarCargos();
  }

}
