import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrganizacionService } from '../../services/organizacion.service';

@Component({
  selector: 'app-empleado-list',
  templateUrl: './empleado-list.component.html',
  styleUrls: ['./empleado-list.component.scss']
})
export class EmpleadoListComponent implements OnInit {

  public data: any = [];

  constructor(public orgService: OrganizacionService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.orgService.getEmpleados().subscribe((data) => {
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
