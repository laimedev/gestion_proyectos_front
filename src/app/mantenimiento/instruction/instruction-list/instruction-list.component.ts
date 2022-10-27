import { Component, OnInit } from '@angular/core';
import { InstructionServiceService } from '../services/instruction-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateInstructionComponent } from '../modal/create-instruction/create-instruction.component';

@Component({
  selector: 'app-instruction-list',
  templateUrl: './instruction-list.component.html',
  styleUrls: ['./instruction-list.component.scss']
})
export class InstructionListComponent implements OnInit {

  public data: any = [];

  constructor(public instructionServ: InstructionServiceService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.instructionServ.getInstruction().subscribe((data) => {
      this.data = data
      console.log(data);
    })
  }



  openCreate() {
    const modalInfo = this.modalService.open(CreateInstructionComponent, { size: 'lg', backdrop: 'static' })
    // modalInfo.componentInstance.user = user
      modalInfo.result.then(res => {
    })
  }

}