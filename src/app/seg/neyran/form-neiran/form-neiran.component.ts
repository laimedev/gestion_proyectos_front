import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ParamService } from 'src/app/services/security/param.service';
import { NeiranCommand } from '../../domain/neiran-command';
import { NeiranService } from '../../service/neiran.service';

@Component({
  selector: 'app-form-neiran',
  templateUrl: './form-neiran.component.html',
  styleUrls: ['./form-neiran.component.scss']
})
export class FormNeiranComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Output() submitEvent = new EventEmitter<NeiranCommand>()
  @Output() closeEvent = new EventEmitter<boolean>()
  @Input() disableControl: boolean
  @Input() formTitle: string
  refreshTable = false

  params$: Observable<any>


  constructor(protected paramService: ParamService) { }

  ngOnInit(): void {
    this.params$ = this.paramService.getMMLType().pipe(map(v => Object.keys(v)))
      
  }

  onSubmit() {
    this.refreshTable = true
    
    if (this.formGroup.valid) {

      this.submitEvent.emit(this.formGroup.value)
    }

    
  }

  closeMOdal(form: NgForm) {
    form.reset()

    this.closeEvent.emit(this.refreshTable)


}

}
