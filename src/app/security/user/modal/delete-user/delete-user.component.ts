import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/entities/security/user';
import { UserService } from 'src/app/services/security/user.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {

  @Input() user: User
  deleted = false
  deleting = false
  constructor(protected activeModal: NgbActiveModal,protected userService: UserService) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.activeModal.close(true)
  }

  deleteUser() {
this.deleting=true
    this.userService.delete(this.user).subscribe(data => {
      console.log(data);
      this.deleted = true
      this.deleting=false
      this.closeModal()
    })

  }

}
