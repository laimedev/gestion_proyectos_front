import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../../../services/security/user.service';

@Component({
  selector: 'app-create-instruction',
  templateUrl: './create-instruction.component.html',
  styleUrls: ['./create-instruction.component.scss']
})
export class CreateInstructionComponent implements OnInit {

  constructor(private activeModal: NgbActiveModal, protected userService: UserService) { }


  ngOnInit(): void {
  }


  closeMOdal() {
    this.activeModal.close()
  }


}
