import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Proyecto } from 'src/app/entities/modulos/proyecto';
import * as moment from 'moment';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProyectoService } from '../../services/proyecto.service';
import { SnackbarHelper } from 'src/app/utils/helpers/snackbar-helper';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-close-proyecto',
  templateUrl: './close-proyecto.component.html',
  styleUrls: ['./close-proyecto.component.scss']
})
export class CloseProyectoComponent implements OnInit {

  @Input() proyecto: Proyecto
  @Input() formGroup: FormGroup;
  @Output() submitEvent = new EventEmitter<Proyecto>()
  @Output() closeEvent =  new EventEmitter<boolean>()

  public diasPlazo  = 0;
  public diasTranscurridos  = 0;
  public diasGanados = 0;
  public valorGanado = 0; //EV
  public valorPlanificado = 0; //PV
  public varCronograma = 0; //SV

  public varCosto = 0;

  constructor(protected activeModal: NgbActiveModal,
              protected fb: FormBuilder,
              protected formService: ProyectoService,
              private snackBar: MatSnackBar) { 
      
              this.formGroup = this.formService.form;

    }

  ngOnInit(): void {
    console.log(this.proyecto)
    this.formGroup = this.formService.form;



    const start = moment(new Date(this.proyecto.fecha_inicio))
    const end =   moment(new Date(this.proyecto.fecha_fin))
    const end2 =   moment(new Date(this.proyecto.fecha_termino))
    this.diasPlazo = end.diff(start, 'd'); 
    this.diasGanados = end.diff(end2, 'd'); 
    this.diasTranscurridos = this.diasPlazo - this.diasGanados;
    const val = this.diasTranscurridos / this.diasPlazo * 100;
    const valPre = this.formatDecimales2(val) * this.proyecto.presupuesto / 100;
    this.valorGanado = valPre;
    const calcPla = this.formatDecimales2(this.proyecto.presupuesto / this.diasPlazo)
    const cala22 =  this.diasTranscurridos * calcPla
    this.valorPlanificado = cala22;
    this.varCronograma = this.formatDecimales2(this.valorPlanificado - this.valorGanado );

    this.varCosto =  this.proyecto.ac - this.valorGanado
    // this.formService.form.get('cv')?.setValue(this.varCosto);


    this.formService.form.get('fecha_inicio')?.setValue(this.proyecto.fecha_inicio)
    this.formService.form.get('fecha_fin')?.setValue(this.proyecto.fecha_fin)
    this.formService.form.get('fecha_termino')?.setValue(this.proyecto.fecha_termino)
    this.formService.form.get('ac')?.setValue(this.proyecto.ac);
    this.formService.form.get('cv')?.setValue(this.proyecto.cv);



    this.formService.form.get('diasPlazo')?.setValue(this.diasPlazo)
    this.formService.form.get('diasTerminados')?.setValue(this.diasTranscurridos)
    this.formService.form.get('diasGanados')?.setValue(this.diasGanados)

    this.formService.form.get('ev')?.setValue(this.valorGanado)
    this.formService.form.get('pv')?.setValue(this.valorPlanificado)
    this.formService.form.get('sv')?.setValue(this.varCronograma)

  }


  formatDecimales2(numero){
    return parseFloat(Number(numero).toFixed(2));
  }


  closeModal() {
    this.activeModal.close(true)
  }



  onSubmit() {
    // value._id = this.proyecto._id
    // console.log(this.formGroup.value)
    // this.formService.editCerrar(this.proyecto)

    this.formService.editCerrar(this.proyecto._id ,this.formGroup.value).subscribe(data => {
      SnackbarHelper.show(this.snackBar, { msg: 'Editó con éxito', })
      // this.enableForm()
      this.activeModal.close(true)
    }, (error) => {
      // this.enableForm()
    })

  }




}
