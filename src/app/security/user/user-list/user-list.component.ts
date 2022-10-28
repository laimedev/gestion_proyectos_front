import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateUserComponent } from '../modal/create-user/create-user.component';
import { UserInfoComponent } from '../modal/user-info/user-info.component';
import { EditUserComponent } from '../modal/edit-user/edit-user.component';
import { DeleteUserComponent } from '../modal/delete-user/delete-user.component';
import { PaginatedDataSource } from 'src/app/utils/paginator/paginated-data-source';
import { MatPaginator } from '@angular/material/paginator';

import { User } from '../../../entities/security/user';
import { UserService } from '../../../services/security/user.service'
import { PageRequest } from 'src/app/utils/paginator/page-utils';
import { CustomOverlayService } from 'src/app/services/overlay/custom-overlay.service';
import { Util } from 'src/app/utils/helpers/util';
import { environment } from 'src/environments/environment';
import { Title } from '@angular/platform-browser';




@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {


  
  public data: any = [];


  public usuario: any[] = [];
  public usuarioTemp: any[] = [];
  
  public cargando: boolean = true;
  public desde: number = 0;
  public formSubmited = false;
  public totalUsuario: number = 0;




  constructor(private modalService: NgbModal,
    private userService: UserService,
    public overlay: CustomOverlayService,
    private docTitleService: Title) { }

  ngOnInit(): void {
    this.cargarUsuarios();
    
  }


  cargarUsuarios(){
    this.cargando = true; 
    this.userService.cargarAdministradores(this.desde)
    .subscribe(({total, admin}) => {
        this.totalUsuario = total;
        console.log(admin)
        if(admin.length !== 0) { 
          this.usuario = admin;
          console.log(admin);
          this.usuarioTemp = admin;
        }
        this.cargando = false;
    })
  }



  openCreate(){
    const modalRef = this.modalService.open(CreateUserComponent, { size: 'lg', backdrop: 'static' });
      modalRef.result.then(res => {
        // this.dataSource.updateTable(0)
        this.cargarUsuarios();
      })
  }


  openEdit(data: User) {
    const modalEdit = this.modalService.open(EditUserComponent, { size: 'lg', backdrop: 'static' })
    modalEdit.componentInstance.user = data
    modalEdit.result.then(res => {
      this.cargarUsuarios();
    })
  }


  openDelete(data: User) {
    const deleteModal = this.modalService.open(DeleteUserComponent, { size: 'lg', backdrop: 'static' })
    deleteModal.componentInstance.user = data
    deleteModal.result.then(res => {
      this.cargarUsuarios();
    })
  }


  cambiarPagina( valor: number) {
    this.desde += valor;
    if(this.desde <0 ) {
      this.desde = 0;
    } else if (this.desde > this.totalUsuario) {
      this.desde -= valor;
    }
    this.cargarUsuarios();
  }


}
