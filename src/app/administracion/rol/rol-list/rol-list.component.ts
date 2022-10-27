import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdministracionService } from '../../services/administracion.service';


@Component({
  selector: 'app-rol-list',
  templateUrl: './rol-list.component.html',
  styleUrls: ['./rol-list.component.scss']
})
export class RolListComponent implements OnInit {

  public data: any = [];

  constructor(public rolService: AdministracionService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.rolService.getRol().subscribe((data) => {
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
