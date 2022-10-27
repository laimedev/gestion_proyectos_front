import { Component, OnInit, Input } from '@angular/core';

import { Map, marker, polygon, tileLayer } from 'leaflet';
import { ActivatedRoute, Router } from '@angular/router';
import { ProducerService } from '../../producer/services/producer.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-form-property',
  templateUrl: './form-property.component.html',
  styleUrls: ['./form-property.component.scss']
})
export class FormPropertyComponent implements OnInit {


  public idDetail = this.actRouter.snapshot.paramMap.get('id');




  tipoSexo = [
    {value: 'M', name: 'Masculino'},
    {value: 'F', name: 'Femenino'}
  ]

  estadoCivil  = [
    {value: 'S', name: 'Soltero'},
    {value: 'C', name: 'Casado'},
    {value: 'V', name: 'Viudo'}
  ]

  estado  = [
    {value: 'A', name: 'Activo'},
    {value: 'I', name: 'Inactivo'},
  ]



  public formSubmited = false;

  public registerForm = this.fb.group({
    id_productor: ['',  Validators.required],
    nombres: ['',  Validators.required],
    apellido_p: ['',  Validators.required],
    apellido_m: ['',  Validators.required],
    dni: ['',  Validators.required],
    cantidad_trabajadores: ['',  Validators.required],
    cantidad_permanentes: ['',  Validators.required],
    trabajadores_ocacionales: ['',  Validators.required],
    trabajadores_contrato: ['',  Validators.required],
    direccion: ['',  Validators.required],
    ubigeo: ['',  Validators.required],
    altitud: ['',  Validators.required],
    area_trabajo: ['',  Validators.required],
    latitud: ['',  Validators.required],
    longitud: ['',  Validators.required],
    status: ['',  Validators.required],
  });


  btnForm: boolean = true;

  constructor(public actRouter: ActivatedRoute,
    public router: Router,
    private prodService: ProducerService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    if(this.idDetail == "0"){
      console.log('agregar')
      this.btnForm = false;
    } else {
      this.cargarPropiedadID();
      this.btnForm = true;
    }
  }



  cargarPropiedadID(){
    this.prodService.showPropiedad({"_id": this.idDetail}).subscribe(resp => {
      const prod = resp['propiedad'][0];
      this.registerForm.get('id_productor')?.setValue(prod.id_productor);
      this.registerForm.get('nombres')?.setValue(prod.nombres);
      this.registerForm.get('apellido_p')?.setValue(prod.apellido_p);
      this.registerForm.get('apellido_m')?.setValue(prod.apellido_m);
      this.registerForm.get('dni')?.setValue(prod.dni);
      this.registerForm.get('cantidad_trabajadores')?.setValue(prod.cantidad_trabajadores);
      this.registerForm.get('cantidad_permanentes')?.setValue(prod.cantidad_permanentes);
      this.registerForm.get('trabajadores_ocacionales')?.setValue(prod.trabajadores_ocacionales);
      this.registerForm.get('trabajadores_contrato')?.setValue(prod.trabajadores_contrato);
      this.registerForm.get('direccion')?.setValue(prod.direccion);
      this.registerForm.get('ubigeo')?.setValue(prod.ubigeo);
      this.registerForm.get('altitud')?.setValue(prod.altitud);
      this.registerForm.get('area_trabajo')?.setValue(prod.area_trabajo);
      this.registerForm.get('latitud')?.setValue(prod.latitud);
      this.registerForm.get('longitud')?.setValue(prod.longitud);
      this.registerForm.get('status')?.setValue(prod.status);

    })
  }



  cancel(){
    this.router.navigateByUrl(`admin/property.list`);
  }





  crear(){
    
    this.formSubmited = true;
    if( this.registerForm.invalid) {
      Swal.fire({
        title: 'Compelete todos los campos',
        text: `Es importante completar toda la información.` ,
        icon: 'info',
        confirmButtonColor: '#045bfc',
        cancelButtonColor: '#ff6c04',
        cancelButtonText: 'Ok',
        showCancelButton: true,
        showConfirmButton: false,
      });
      return;
    }
    console.log(this.registerForm.value);

    Swal.fire({
      title: 'Crear Propiedad?',
      text: `Seguro de registrar la informacion de la propiedad?` ,
      icon: 'warning',
      confirmButtonColor: '#045bfc',
      cancelButtonColor: '#ff6c04',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      confirmButtonText: 'Si, registrarlo!'
    }).then((result) => {
      if (result.value) {

          this.prodService.crearPropiedad(this.registerForm.value).subscribe(resp => {
            console.log(resp);
          })
          Swal.fire({
            title: 'Informacion Registrada',
            text: `Su propiedad fue registrado correctamente.` ,
            icon: 'success',
            confirmButtonColor: '#045bfc',
            cancelButtonColor: '#ff6c04',
            cancelButtonText: 'Ok',
            showCancelButton: true,
            showConfirmButton: false,
          });
          this.router.navigateByUrl('admin/property.list')
      }
    })


  }


  editar(){
    this.formSubmited = true;
    console.log(this.registerForm.value);

    Swal.fire({
      title: 'Actualizar Propiedad?',
      text: `Seguro de actualizar la informacion del propiedad?` ,
      icon: 'warning',
      confirmButtonColor: '#045bfc',
      cancelButtonColor: '#ff6c04',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      confirmButtonText: 'Si, actualizarlo!'
    }).then((result) => {
      if (result.value) {

          this.prodService.editarPropiedad(this.idDetail, this.registerForm.value).subscribe(resp => {
            console.log(resp);
          })
          Swal.fire({
            title: 'Informacion Actualizada',
            text: `Su propiedad fue actualizado correctamente.` ,
            icon: 'success',
            confirmButtonColor: '#045bfc',
            cancelButtonColor: '#ff6c04',
            cancelButtonText: 'Ok',
            showCancelButton: true,
            showConfirmButton: false,
          });
          this.router.navigateByUrl('admin/property.list')
      }
    })
  }
 

}
