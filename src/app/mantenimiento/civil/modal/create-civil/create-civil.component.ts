import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../../../services/security/user.service';

@Component({
  selector: 'app-create-civil',
  templateUrl: './create-civil.component.html',
  styleUrls: ['./create-civil.component.scss']
})
export class CreateCivilComponent implements OnInit {


  constructor(private activeModal: NgbActiveModal, protected userService: UserService) { }


  ngOnInit(): void {
  }


  closeMOdal() {
    this.activeModal.close()
  }


}