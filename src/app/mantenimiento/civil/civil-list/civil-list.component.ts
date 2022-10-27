import { Component, OnInit } from '@angular/core';
import { CivilServiceService } from '../services/civil-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateCivilComponent } from '../modal/create-civil/create-civil.component';

@Component({
  selector: 'app-civil-list',
  templateUrl: './civil-list.component.html',
  styleUrls: ['./civil-list.component.scss']
})
export class CivilListComponent implements OnInit {

  public data: any = [];

  constructor(public genderServ: CivilServiceService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.genderServ.getCivil().subscribe((data) => {
      this.data = data
      console.log(data);
    })
  }


  openCreate() {
    const modalInfo = this.modalService.open(CreateCivilComponent, { size: 'lg', backdrop: 'static' })
    // modalInfo.componentInstance.user = user
    modalInfo.result.then(res => {

    })
  }

}
