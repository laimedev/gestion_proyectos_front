import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ParamService } from 'src/app/services/security/param.service';

@Component({
  selector: 'app-man-form',
  templateUrl: './man-form.component.html',
  styleUrls: ['./man-form.component.scss']
})
export class ManFormComponent implements OnInit {

  @Input() formGroup: FormGroup;
  @Output() submitEvent = new EventEmitter<any>()
  @Output() closeEvent = new EventEmitter<boolean>()
  @Input() disableControl: boolean
  @Input() formTitle: string
  refreshTable = false

    //select
    cbBanda = []
    cbPoligono = []
    cbTipo = []
    cbFuente = []
    cbKpi = []
    cbCondicion = []

  constructor(protected paramService: ParamService) { }

  ngOnInit(): void {
    this.paramService.threahold().subscribe(({banda, poligono, tipo, fuente, kpi, condicion}) => {
      this.cbBanda = Object.keys(banda)
      this.cbPoligono = Object.keys(poligono)
      this.cbTipo = Object.keys(tipo)
      this.cbFuente = Object.keys(fuente)
      this.cbKpi = Object.keys(kpi)
      this.cbCondicion = Object.keys(condicion)
    })

  }

  onSubmit() {
    this.refreshTable = true    
    if (this.formGroup.valid) this.submitEvent.emit(this.formGroup.value)  
  }

  closeMOdal() {this.closeEvent.emit(this.refreshTable)}
  
}
