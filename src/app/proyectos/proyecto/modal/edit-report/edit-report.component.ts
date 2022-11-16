import { Component, Input, OnInit } from '@angular/core';
import { Proyecto } from 'src/app/entities/modulos/proyecto';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/app/services/security/login.service';
import { ReporteService } from '../../services/reporte.service';
import { Reporte } from 'src/app/entities/modulos/reporte';
import * as moment from 'moment';
import { SnackbarHelper } from 'src/app/utils/helpers/snackbar-helper';


@Component({
  selector: 'app-edit-report',
  templateUrl: './edit-report.component.html',
  styleUrls: ['./edit-report.component.scss']
})
export class EditReportComponent implements OnInit {


  @Input() proyecto: Reporte
  formGroup: FormGroup;
  formLoaded = false
  disableControl = false;
  // serverResponseJSON: 
  
  public horasPlazo  = 0;
  public horasTranscurridos  = 0;
  public horasGanados = 0;

  public valorGanado = 0; //EV
  public valorPlanificado = 0; //PV
  public varCronograma = 0; //SV

  public varCosto = 0;



  constructor(protected activeModal: NgbActiveModal,
    private snackBar: MatSnackBar,
    private modalService: NgbModal,
    protected loginService: LoginService,
    public reporteService: ReporteService) { 

      this.formGroup = this.reporteService.form;


    }

  ngOnInit(): void {

    const start = moment(new Date(this.proyecto.fecha_desde))
    const end =   moment(new Date(this.proyecto.fecha_hasta))
    const end2 =   moment(new Date(this.proyecto.fecha_fin))
    this.horasPlazo = end.diff(start, 'h'); 
    this.horasGanados = end.diff(end2, 'h'); 

    
    this.horasTranscurridos = this.horasPlazo - this.horasGanados;
    const val = this.horasTranscurridos / this.horasPlazo * 100;
    const valPre = this.formatDecimales2(val) * this.proyecto.presupuesto / 100;
    this.valorGanado = valPre;
    const calcPla = this.formatDecimales2(this.proyecto.presupuesto / this.horasPlazo)
    const cala22 =  this.horasTranscurridos * calcPla
    this.valorPlanificado = cala22;
    this.varCronograma = this.formatDecimales2(this.valorPlanificado - this.valorGanado );

    this.varCosto = this.proyecto.presupuesto - this.proyecto.ac

    
    this.formGroup.get('fecha_desde')?.setValue(this.proyecto.fecha_desde)
    this.formGroup.get('fecha_hasta')?.setValue(this.proyecto.fecha_hasta)
    this.formGroup.get('horas')?.setValue(this.proyecto.horas)
    this.formGroup.get('fecha_fin')?.setValue(this.proyecto.fecha_fin)


    this.formGroup.get('horasPlazo')?.setValue(this.horasPlazo)
    this.formGroup.get('horasTerminados')?.setValue(this.horasTranscurridos)
    this.formGroup.get('horasGanados')?.setValue(this.horasGanados)


    this.formGroup.get('ev')?.setValue(this.valorGanado)
    this.formGroup.get('pv')?.setValue(this.valorPlanificado)
    this.formGroup.get('sv')?.setValue(this.varCronograma)

    
  }


  formatDecimales2(numero){
    return parseFloat(Number(numero).toFixed(2));
  }



  onSubmit() {
    // console.log(this.formGroup.value)
    // if (this.formGroup.valid) {
    //   this.reportService.create(this.formGroup.value).subscribe(resp => {
    //     this.enableForm()
    //     SnackbarHelper.show(this.snackBar, { msg: 'Se creó con éxito', })
    //     this.ngModal.dismissAll();
    //   })
    //   this.formGroup.reset();
    // }


    this.reporteService.editCerrar(this.proyecto._id ,this.formGroup.value).subscribe(data => {
      SnackbarHelper.show(this.snackBar, { msg: 'Editó con éxito', })
      // this.enableForm()
      this.activeModal.close(true)
    }, (error) => {
      // this.enableForm()
    })


  }
  



  closeMOdal() {
    this.activeModal.close()
  }


  onClose($res: any) {
    this.activeModal.close($res)
  }


}
