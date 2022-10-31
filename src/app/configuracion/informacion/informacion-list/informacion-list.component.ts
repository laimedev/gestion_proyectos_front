import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Configuracion } from 'src/app/entities/modulos/configuracion';
import { SnackbarHelper } from 'src/app/utils/helpers/snackbar-helper';
import { InformacionService } from '../services/informacion.service';

@Component({
  selector: 'app-informacion-list',
  templateUrl: './informacion-list.component.html',
  styleUrls: ['./informacion-list.component.scss']
})
export class InformacionListComponent implements OnInit {

  formGroup: FormGroup;
  @Input() disableControl: boolean
  @Input() formTitle: string
  public informacion: Configuracion

  public portada: any;
  public noportada = 'assets/img/image_icon.png';
  public portadaEdit: any;
  public noportadaEdit = 'assets/img/image_icon.png';

  constructor(public configService: InformacionService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.formGroup = this.configService.form;



    this.configService.cargarConfiguracion().subscribe(resp => {
      console.log(resp.configuracion[0])
      this.configService.fillForm = resp.configuracion[0];
      localStorage.setItem('informacion', JSON.stringify(resp.configuracion[0]))
    })

    // console.log(this.informacion.id)


  }



  changeFotoUpdate(){
    var file = (<HTMLInputElement>document.getElementById("fupFoto1")).files[0];
    var fileReader = new FileReader();
    fileReader.onloadend =  () => {
      this.portadaEdit = fileReader.result
    }
    fileReader.readAsDataURL(file);
  }



  onSubmit() {
    console.log(this.formGroup.value)
    // const date = new Date(Date.parse(this.formGroup.get('fecha_nacimiento').value))
    // this.formGroup.get('fecha_nacimiento')?.setValue(date);
    // console.log(this.formGroup.value);
    //   this.submitEvent.emit(this.formGroup.value)
    //   this.formGroup.reset();


    // this.disableForm()
      // value._id = this.informacion._id
      // const value
      this.configService.edit(this.formGroup.value).subscribe(data => {
        SnackbarHelper.show(this.snackBar, { msg: 'Editó con éxito', })
        // this.enableForm()
        // this.activeModal.close(true)
      }, (error) => {
        // this.enableForm()
      })

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
