import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EmpleadoService } from 'src/app/empleados/empleado/services/empleado.service';
import { Proyecto } from 'src/app/entities/modulos/proyecto';
import { LoginService } from 'src/app/services/security/login.service';
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

  public totalHorasTrabajadas = 0;
  public totalPagoResponsable = 0;

  // public subTotal = this.proyecto.presupuesto = this.totalHorasTrabajadas * this.totalPagoResponsable ;
  typeUser

  
  constructor(
    protected formService: ProyectoService,
    protected  empleadoService: EmpleadoService,
    protected reporteService: ReporteService,
    protected activeModal: NgbActiveModal,
    private snackBar: MatSnackBar,
    protected loginService: LoginService) {
  }

  ngOnInit(): void {
    this.formService.getById({ "_id": this.proyecto._id}).subscribe(data => {
      console.log(data['proyecto'][0])
      console.log("cargo editar")
      this.formService.fillForm = data['proyecto'][0]
      this.formLoaded = true;


      this.typeUser = this.loginService.getLogin()?.role


      this.empleadoService.getById({ "_id": data['proyecto'][0].responsable}).subscribe(data => {
        this.totalPagoResponsable = data['personal'][0]['pago'];
        console.log('CANTIDAD DE PAGO EMPLEADO');
        console.log(this.totalPagoResponsable) 
      })


      this.reporteService.getByReportes(this.desde, { "proyectoID":  data['proyecto'][0]._id})
      .subscribe(({total, reporte}) => {
          console.log(reporte);
          this.totalReporte = total;

          this.totalHorasTrabajadas = reporte.reduce((sum, value) => (typeof value.horas == "number" ? sum + value.horas : sum), 0);
          console.log('CANTIDAD DE HORAS TRABAJDAS');
          console.log(this.totalHorasTrabajadas);

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
