import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Reporte } from 'src/app/entities/modulos/reporte';
import { ReporteService } from '../../services/reporte.service';
import { SnackbarHelper } from 'src/app/utils/helpers/snackbar-helper';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-delete-report',
  templateUrl: './delete-report.component.html',
  styleUrls: ['./delete-report.component.scss']
})
export class DeleteReportComponent implements OnInit {

  @Input() proyecto: Reporte
  deleted = false
  deleting = false

  constructor(protected activeModal: NgbActiveModal,
    protected proyectoeService: ReporteService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }


  closeModal() {
    this.activeModal.close(true)
  }

  delete() {
    this.deleting=true
    this.proyectoeService.delete(this.proyecto).subscribe(data => {

      SnackbarHelper.show(this.snackBar, { msg: 'Eliminado con éxito', })

      console.log(data);
      this.deleted = true
      this.deleting=false
      this.closeModal()
    })  
  }


}
