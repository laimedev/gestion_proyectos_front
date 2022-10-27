import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProducerService } from '../services/producer.service';

@Component({
  selector: 'app-form-producer',
  templateUrl: './form-producer.component.html',
  styleUrls: ['./form-producer.component.scss']
})
export class FormProducerComponent implements OnInit {

  public idDetail = this.actRouter.snapshot.paramMap.get('id');


  tipoSexo = [
    {value: 'M', name: 'Masculino'},
    {value: 'F', name: 'Femenino'}
  ]

  estadoCivil  = [
    {value: 'Soltero', name: 'Soltero'},
    {value: 'Casado', name: 'Casado'},
    {value: 'Viudo', name: 'Viudo'}
  ]

  estado  = [
    {value: 'Aprobado', name: 'Aprobado'},
    {value: 'Proceso', name: 'Proceso'},
    {value: 'Inicial', name: 'Inicial'},
  ]






  public formSubmited = false;

  public registerForm = this.fb.group({
    id_productor: ['',  Validators.required],
    nombres: ['',  Validators.required],
    apellido_p: ['',  Validators.required],
    apellido_m: ['',  Validators.required],
    celular: ['',  Validators.required],
    correo: ['',  Validators.required],
    // created: ['',  Validators.required],
    departamento: ['',  Validators.required],
    direccion: ['',  Validators.required],
    distrito: ['',  Validators.required],
    dni: ['',  Validators.required],
    estado: ['',  Validators.required],
    fecha_inscripcion: ['',  Validators.required],
    grado_instruccion: ['',  Validators.required],
    provincia: ['',  Validators.required],
    sexo: ['',  Validators.required],
    telefono: ['',  Validators.required],
    ubigeo: ['',  Validators.required],
    status: ['',  Validators.required],
  });


  btnForm: boolean = true;


  constructor(public actRouter: ActivatedRoute,
             public router: Router,
             private prodService: ProducerService,
             private fb: FormBuilder) {

    console.log( 'IDENTIFICADOR: ' , this.idDetail);

   }

  ngOnInit(): void {

    if(this.idDetail == "0"){
      console.log('agregar')
      this.btnForm = false;
    } else {
      this.cargarProductorID();
      this.btnForm = true;
    }
    
  }



  cargarProductorID(){
    this.prodService.showProductor({"_id": this.idDetail}).subscribe(resp => {
      const prod = resp['productor'][0];
      this.registerForm.get('id_productor')?.setValue(prod.id_productor);
      this.registerForm.get('nombres')?.setValue(prod.nombres);
      this.registerForm.get('apellido_p')?.setValue(prod.apellido_p);
      this.registerForm.get('apellido_m')?.setValue(prod.apellido_m);
      this.registerForm.get('correo')?.setValue(prod.correo);
      this.registerForm.get('departamento')?.setValue(prod.departamento);
      this.registerForm.get('direccion')?.setValue(prod.direccion);
      this.registerForm.get('distrito')?.setValue(prod.distrito);
      this.registerForm.get('dni')?.setValue(prod.dni);
      this.registerForm.get('estado')?.setValue(prod.estado);
      this.registerForm.get('fecha_inscripcion')?.setValue(prod.fecha_inscripcion);
      this.registerForm.get('grado_instruccion')?.setValue(prod.grado_instruccion);
      this.registerForm.get('provincia')?.setValue(prod.provincia);
      this.registerForm.get('sexo')?.setValue(prod.sexo);
      this.registerForm.get('telefono')?.setValue(prod.telefono);
      this.registerForm.get('celular')?.setValue(prod.celular);
      this.registerForm.get('ubigeo')?.setValue(prod.ubigeo);
      this.registerForm.get('status')?.setValue(prod.status);
    })
  }


  cancel(){
    this.router.navigateByUrl(`admin/producer.list`);
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
      title: 'Crear Productor?',
      text: `Seguro de registrar la informacion del productor?` ,
      icon: 'warning',
      confirmButtonColor: '#045bfc',
      cancelButtonColor: '#ff6c04',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      confirmButtonText: 'Si, registrarlo!'
    }).then((result) => {
      if (result.value) {

          this.prodService.crearProductor(this.registerForm.value).subscribe(resp => {
            console.log(resp);
          })
          Swal.fire({
            title: 'Informacion Registrada',
            text: `Su productor fue registrado correctamente.` ,
            icon: 'success',
            confirmButtonColor: '#045bfc',
            cancelButtonColor: '#ff6c04',
            cancelButtonText: 'Ok',
            showCancelButton: true,
            showConfirmButton: false,
          });
          this.router.navigateByUrl('admin/producer.list')
      }
    })


  }


  editar(){
    this.formSubmited = true;
    console.log(this.registerForm.value);

    Swal.fire({
      title: 'Actualizar Productor?',
      text: `Seguro de actualizar la informacion del productor?` ,
      icon: 'warning',
      confirmButtonColor: '#045bfc',
      cancelButtonColor: '#ff6c04',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      confirmButtonText: 'Si, actualizarlo!'
    }).then((result) => {
      if (result.value) {

          this.prodService.editarProductor(this.idDetail, this.registerForm.value).subscribe(resp => {
            console.log(resp);
          })
          Swal.fire({
            title: 'Informacion Actualizada',
            text: `Su productor fue actualizado correctamente.` ,
            icon: 'success',
            confirmButtonColor: '#045bfc',
            cancelButtonColor: '#ff6c04',
            cancelButtonText: 'Ok',
            showCancelButton: true,
            showConfirmButton: false,
          });
          this.router.navigateByUrl('admin/producer.list')
      }
    })


    
  }
}
