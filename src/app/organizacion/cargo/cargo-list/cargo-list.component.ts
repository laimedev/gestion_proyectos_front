import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrganizacionService } from '../../services/organizacion.service';


@Component({
  selector: 'app-cargo-list',
  templateUrl: './cargo-list.component.html',
  styleUrls: ['./cargo-list.component.scss']
})
export class CargoListComponent implements OnInit {

  public data: any = [];

  constructor(public orgService: OrganizacionService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.orgService.getCargo().subscribe((data) => {
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
