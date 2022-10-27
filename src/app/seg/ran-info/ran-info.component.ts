import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { SeguimientoRan } from '../domain/seguimiento-ran';
import { RanService } from '../service/ran.service';

@Component({
  selector: 'app-ran-info',
  templateUrl: './ran-info.component.html',
  styleUrls: ['./ran-info.component.scss']
})
export class RanInfoComponent implements OnInit {

  form: FormGroup
  displayedColumns: string[]
  dataSource: string[]
  seg$: Observable<SeguimientoRan>

  constructor(private route: ActivatedRoute,
    private fb: FormBuilder, 
    private ranService: RanService) { 

      
    }

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.seg$ = this.ranService.getById(id)
    
    this.displayedColumns = [
      'proyecto', 'anio', 'nombre_sitio', 'celda', 'tipo_celda',
      'sector', 'tipo_solucion', 'estado_proyecto', 'servicio', 'fecha_on_air',
      'fecha_evaluacion', 'dia_evaluacion'
    ];

    this.dataSource = [];

    this.form = this.fb.group(
      {
        archivo: [''],
        fecha: [''],
        celda_ev: [''],
        celda_in: [''],
        celda_to: ['']
      }
    )
  }

}
