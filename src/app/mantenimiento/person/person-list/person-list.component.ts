import { Component, OnInit } from '@angular/core';

import { PersonService } from '../services/person.service';


@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent implements OnInit {

  public data: any = [];


  constructor(public personServices: PersonService) { }

  ngOnInit(): void {
    this.personServices.getPerson().subscribe((data) => {
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
