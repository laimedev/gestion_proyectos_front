import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/security/user.service';
import { User } from 'src/app/entities/security/user';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  @Input() user: User
  userData: User

  constructor(private activeModal: NgbActiveModal, protected userService: UserService) { }

  ngOnInit(): void {

    this.userService.getById(this.user).subscribe(data => {
     
      this.userData = data
      
      
    })

  }

  closeMOdal() {
    this.activeModal.close()
  }

}
