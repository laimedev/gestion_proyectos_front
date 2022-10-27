import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrganizacionService } from '../../services/organizacion.service';

@Component({
  selector: 'app-departamento-list',
  templateUrl: './departamento-list.component.html',
  styleUrls: ['./departamento-list.component.scss']
})
export class DepartamentoListComponent implements OnInit {

  public data: any = [];

  constructor(public orgService: OrganizacionService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.orgService.getDepartamento().subscribe((data) => {
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

