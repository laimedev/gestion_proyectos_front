import { Component, OnInit } from '@angular/core';
import { GenderServiceService } from '../gender-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateGenderComponent } from '../modal/create-gender/create-gender.component';

@Component({
  selector: 'app-gender-list',
  templateUrl: './gender-list.component.html',
  styleUrls: ['./gender-list.component.scss']
})
export class GenderListComponent implements OnInit {

public data: any = [];

  constructor(public genderServ: GenderServiceService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.genderServ.getGender().subscribe((data) => {
      this.data = data
      console.log(data);
    })
  }



  openCreate() {
    const modalInfo = this.modalService.open(CreateGenderComponent, { size: 'lg', backdrop: 'static' })
    // modalInfo.componentInstance.user = user
    modalInfo.result.then(res => {

    })
  }

}
