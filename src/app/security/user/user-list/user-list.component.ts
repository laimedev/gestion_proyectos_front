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

const ELEMENT_DATA = [

  { "id": 5, "email": "aaea@gmail.com", "username": "superuserasd", "fullname": "asdasdr", "cellphone": null, "status": "Inactivo", "created_at": "26\/02\/2020 03:07:39" },
  { "id": 3, "email": "dennis.jurado@asistp.us", "username": "dennis.jurado@asistp.us", "fullname": "Dennis Jurado", "cellphone": "111000222", "status": "Activo", "created_at": "19\/12\/2019 11:51:27" },
  { "id": 2, "email": "Dereck@gmail.com", "username": "Dereck", "fullname": "Dereck", "cellphone": null, "status": "Activo", "created_at": "18\/12\/2019 10:38:42" },
  { "id": 1, "email": "admin@entel.pe", "username": "superuser", "fullname": "Usuario Administrador", "cellphone": null, "status": "Activo", "created_at": "15\/11\/2019 05:00:00" }

]


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, AfterViewInit {


  listUser: User [] = [
    // {UserId: 1, UserName: 'UserName', Email: 'Emsasaail', PasswordHash: 'PasswordHasasash', PhoneNumber: 'PhonesasaNumber', CreateDate: 'CreasasateDate' }
    
  ];

  displayedColumns: string[] = ['UserId','UserName', 'Email', 'PasswordHash', 'PhoneNumber', 'CreateDate', 'options'];
  dataSource = new MatTableDataSource(this.listUser);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  constructor(private modalService: NgbModal,
    private userService: UserService,
    public overlay: CustomOverlayService,
    private docTitleService: Title) { }

  ngOnInit(): void {
    this.docTitleService.setTitle('Usuarios - ' + environment.appTitle)
    this.userService.getAllUser2().subscribe( resp => {
      this.dataSource = resp['result'];
      console.log(resp['result'])
    })
  }


  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

 

  export() {

    // this.userService
    //   .export(this.dataSource.lastFilter)
    //   .subscribe(({ data }) => Util.download(data, 'usuarios'));

  }

  openCreate(): void {

    const modalRef = this.modalService.open(CreateUserComponent, { size: 'lg', backdrop: 'static' });

    modalRef.result.then(res => {
      // this.dataSource.updateTable(0)
    })
  }

  openInfo(user: User) {
    console.log(user);
    const modalInfo = this.modalService.open(UserInfoComponent, { size: 'lg', backdrop: 'static' })
    modalInfo.componentInstance.user = user
    modalInfo.result.then(res => {

    })

  }

  openEdit(user: User) {

    const modalEdit = this.modalService.open(EditUserComponent, { size: 'lg', backdrop: 'static' })
    modalEdit.componentInstance.user = user
    modalEdit.result.then(res => {
      // this.dataSource.updateTable(this.paginator.pageIndex)
    })


  }

  openDelete(user: User) {

    const deleteModal = this.modalService.open(DeleteUserComponent, { size: 'lg', backdrop: 'static' })
    deleteModal.componentInstance.user = user
    deleteModal.result.then(res => {
      // this.dataSource.updateTable(this.paginator.pageIndex)
    })
  }

  search() {

    if (this.dateRange.valid) {

      let start = new Date(Date.parse(this.dateRange.get('start').value))
      let end = new Date(Date.parse(this.dateRange.get('end').value))
      //------------------------------------------------------------------

      let startStr = new Intl.DateTimeFormat('es-PE', { month: '2-digit', day: '2-digit', year: 'numeric' }).format(start) + ' 00:00:00'
      let endStr = new Intl.DateTimeFormat('es-PE', { month: '2-digit', day: '2-digit', year: 'numeric' }).format(end) + ' 23:59:59'

      let filters = [
        { field: 'createdAt', value: startStr, operator: 'gte' },
        { field: 'createdAt', value: endStr, operator: 'lte' }
      ]

      // this.dataSource.filterInput(filters)

    } else {
      console.log('Not valid');

    }

  }


}
