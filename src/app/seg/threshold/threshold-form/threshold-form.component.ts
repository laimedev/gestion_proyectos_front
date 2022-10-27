import {  Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ParamService } from 'src/app/services/security/param.service';
import { Thresholds } from '../../domain/thresholds-comand';

@Component({
  selector: 'app-threshold-form',
  templateUrl: './threshold-form.component.html',
  styleUrls: ['./threshold-form.component.scss']
})
export class ThresholdFormComponent implements OnInit {

  @Input() formGroup: FormGroup;
  @Output() submitEvent = new EventEmitter<Thresholds>()
  @Output() closeEvent = new EventEmitter<boolean>()
  @Input() disableControl: boolean
  @Input() formTitle: string
  @Input() edit = false;
  refreshTable = false

  params$: Observable<any>
  flujo$: Observable<any>
  unidad$: Observable<any>

  constructor(protected paramService: ParamService) { }

  ngOnInit(): void {
   const response = this.paramService.evaluationThreahold();

   this.flujo$= response.pipe(map(data =>  Object.keys(data.flujo)));

   this.unidad$= response.pipe(map(data =>  Object.keys(data.unidad)));

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
