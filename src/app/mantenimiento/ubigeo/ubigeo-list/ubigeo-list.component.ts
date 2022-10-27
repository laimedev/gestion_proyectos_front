import { Component, OnInit } from '@angular/core';
import { UbigeoServiceService } from '../services/ubigeo-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateUbigeoComponent } from '../modal/create-ubigeo/create-ubigeo.component';

@Component({
  selector: 'app-ubigeo-list',
  templateUrl: './ubigeo-list.component.html',
  styleUrls: ['./ubigeo-list.component.scss']
})
export class UbigeoListComponent implements OnInit {

  public data: any = [];

  constructor(public ubigeoServ: UbigeoServiceService,
             private modalService: NgbModal) { }

  ngOnInit(): void {
    this.ubigeoServ.getUbigeo().subscribe((data) => {
      this.data = data
      console.log(data);
    })
  }



  openCreate() {
    const modalInfo = this.modalService.open(CreateUbigeoComponent, { size: 'lg', backdrop: 'static' })
    // modalInfo.componentInstance.user = user
    modalInfo.result.then(res => {

    })
  }

}