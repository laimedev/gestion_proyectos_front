import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Proyecto } from 'src/app/entities/modulos/proyecto';
import { ProyectoService } from '../../services/proyecto.service';
import { ReporteService } from '../../services/reporte.service';

@Component({
  selector: 'app-view-proyecto',
  templateUrl: './view-proyecto.component.html',
  styleUrls: ['./view-proyecto.component.scss']
})
export class ViewProyectoComponent implements OnInit {

  formGroup: FormGroup;
  formLoaded = false
  disableControl = false;
  serverResponseJSON: any
  @Input() proyecto: Proyecto


  public data: any = [];
  public reporte: any[] = [];
  public reporteTemp: any[] = [];

  public cargando: boolean = true;
  public desde: number = 0;
  public formSubmited = false;
  public totalReporte: number = 0;


  constructor(
    protected formService: ProyectoService,
    protected reporteService: ReporteService,
    protected activeModal: NgbActiveModal,
    private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.formService.getById({ "_id": this.proyecto._id}).subscribe(data => {
      console.log(data['proyecto'][0])
      console.log("cargo editar")
      this.formService.fillForm = data['proyecto'][0]
      this.formLoaded = true

      this.reporteService.getByReportes(this.desde, { "proyectoID":  data['proyecto'][0]._id})
      .subscribe(({total, reporte}) => {
          console.log(reporte);
          this.totalReporte = total;
          if(reporte.length !== 0) { 
            this.reporte = reporte;
            console.log(reporte);
            this.reporteTemp = reporte;
          }
          this.cargando = false;
      })



    })
    // this.formGroup = this.formService.form;
  }




  cambiarPagina( valor: number) {
    this.desde += valor;
    if(this.desde <0 ) {
      this.desde = 0;
    } else if (this.desde > this.totalReporte) {
      this.desde -= valor;
    }
  }




  disableForm(): void {
    this.disableControl = true
    this.formGroup.disable()
  }

  enableForm() {
    this.disableControl = false
      this.formGroup.enable()
  }


  onClose($res: any) {
    this.activeModal.close($res)
  }

  closeMOdal() {
    this.activeModal.close()
  }


}
