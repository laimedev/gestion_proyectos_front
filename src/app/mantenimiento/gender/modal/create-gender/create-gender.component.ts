import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../../../services/security/user.service';

@Component({
  selector: 'app-create-gender',
  templateUrl: './create-gender.component.html',
  styleUrls: ['./create-gender.component.scss']
})
export class CreateGenderComponent implements OnInit {

  constructor(private activeModal: NgbActiveModal, protected userService: UserService) { }


  ngOnInit(): void {
  }


  closeMOdal() {
    this.activeModal.close()
  }


}
