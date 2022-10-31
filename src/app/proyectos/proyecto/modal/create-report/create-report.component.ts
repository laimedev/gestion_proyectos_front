import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReporteService } from '../../services/reporte.service';

import * as moment from 'moment';
import { TrabajoService } from 'src/app/trabajos/trabajo/services/trabajo.service';
import { LoginService } from 'src/app/services/security/login.service';
import { Proyecto } from 'src/app/entities/modulos/proyecto';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SnackbarHelper } from 'src/app/utils/helpers/snackbar-helper';

@Component({
  selector: 'app-create-report',
  templateUrl: './create-report.component.html',
  styleUrls: ['./create-report.component.scss']
})
export class CreateReportComponent implements OnInit {

  formGroup: FormGroup;
  @Input() disableControl: boolean

  trabajos: any [] = [];

  @Input() proyecto: Proyecto


  constructor(public reportService: ReporteService,
    private snackBar: MatSnackBar,
    public trabajoService: TrabajoService,
    protected loginService: LoginService,
    public ngModal: NgbModal) { 

      

    }

  ngOnInit(): void {

    this.formGroup = this.reportService.form;


    this.trabajoService.cargarTrabajos().subscribe(resp => {
      this.trabajos = resp['trabajo'];
    })


    console.log(this.proyecto);
    // console.log(this.proyecto);
  }


  hora1(){
    this.formGroup.get('proyectoID')?.setValue(this.proyecto._id)
    this.formGroup.get('proyectoNombre')?.setValue(this.proyecto.nombre)
    this.formGroup.get('personalID')?.setValue(this.loginService.getLogin()?.id)
    this.formGroup.get('personalNombre')?.setValue(this.loginService.getLogin()?.user)
    const start = moment(new Date(this.formGroup.get('fecha_desde').value))
    const end =   moment(new Date(this.formGroup.get('fecha_hasta').value))
    var diff = end.diff(start, 'h'); // Diff in hours
    console.log(diff);
    this.formGroup.get('horas')?.setValue(diff)
  }

  onSubmit() {
    if (this.formGroup.valid) {
      // this.submitEvent.emit(this.formGroup.value)
      this.trabajoService.create(this.formGroup.value).subscribe(resp => {
        this.enableForm()
        SnackbarHelper.show(this.snackBar, { msg: 'Se creó con éxito', })
        this.ngModal.dismissAll();
      })
      this.formGroup.reset();
    }

  }
  
  closeMOdal(){
    this.ngModal.dismissAll();
    this.formGroup.reset();
  }

  disableForm(): void {
    this.disableControl = true
    this.formGroup.disable()
  }

  enableForm() {
    this.disableControl = false
      this.formGroup.enable()
  }


}
