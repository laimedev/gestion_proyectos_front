import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ParamService } from 'src/app/services/security/param.service';
import { Params } from 'src/app/entities/security/params';
import { Rol } from 'src/app/entities/security/rol';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-kpi-form',
  templateUrl: './kpi-form.component.html',
  styleUrls: ['./kpi-form.component.scss']
})
export class KpiFormComponent implements OnInit {


    @Input() formGroup: FormGroup;
    @Input() selectedRols = []
    @Output() submitEvent = new EventEmitter<Rol>()
    @Output() closeEvent =  new EventEmitter<boolean>()
    @Input() formTitle: string
    @Input() disableControl: boolean

    refreshTable = false


  constructor(protected paramService: ParamService) { }

  ngOnInit(): void {
      console.log("llego aca");
  }

  closeMOdal() {

      this.closeEvent.emit(this.refreshTable)


  }


  checkedIf(rolId:number) {    
    return this.selectedRols.includes(rolId);
  }

  checked($event: MatCheckboxChange) {

    if ($event.checked) {
      this.selectedRols.push($event.source.value)
    } else {
      this.selectedRols = this.selectedRols.filter(i => i != $event.source.value)
    }

    console.log(this.selectedRols);
    
    
  }

  onSubmit() {
   this.refreshTable = true
    //this.formGroup.get('roleIds').setValue(this.selectedRols)
    if (this.formGroup.valid) {

      this.submitEvent.emit(this.formGroup.value)
    }

    
  }

}
