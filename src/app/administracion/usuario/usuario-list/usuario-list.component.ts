import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdministracionService } from '../../services/administracion.service';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.scss']
})
export class UsuarioListComponent implements OnInit {

  public data: any = [];

  constructor(public rolService: AdministracionService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.rolService.getUser().subscribe((data) => {
      this.data = data
      console.log(data);
    })
  }


  openCreate() {
    // const modalInfo = this.modalService.open(CreateCivilComponent, { size: 'lg', backdrop: 'static' })
    // modalInfo.result.then(res => {
    // })
  }

}
