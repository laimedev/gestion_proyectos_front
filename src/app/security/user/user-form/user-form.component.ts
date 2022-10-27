import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ParamService } from 'src/app/services/security/param.service';
import { Params } from 'src/app/entities/security/params';
import { Rol } from 'src/app/entities/security/rol';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

    statusEntity = [
        {value: '1', label: 'Activo'},
        {value: '2', label: 'Inactivo'}
    ]

    areas: Params[]
    workerType: Params[]
    roles: Rol[]

    @Input() formGroup: FormGroup;
    @Input() selectedRols = []
    @Output() submitEvent = new EventEmitter<Rol>()
    @Output() closeEvent =  new EventEmitter<boolean>()
    @Input() disableControl: boolean
    @Input() formTitle: string

    refreshTable = false

    

    //arrayIds: string[] = []

  constructor(protected paramService: ParamService) { }

  ngOnInit(): void {
    console.log("ppasa usuario");
    this.paramService.getParams().subscribe(data => {
      this.areas = data.area
      this.workerType = data.userType
      this.roles = data.roles
    }) 
      
  }

  closeMOdal() {

      this.closeEvent.emit(this.refreshTable)


  }

  changePwValidators($res: MatSelectChange) {
    console.log($res.value);
    
    if ($res.value == 'entel') {
        this.formGroup.get('password').clearValidators()
        this.formGroup.get('passwordr').clearValidators()
        this.formGroup.get('passwordr').reset()
        this.formGroup.get('password').reset()
    } else {
        this.formGroup.get('password').setValidators([Validators.required])
        this.formGroup.get('passwordr').setValidators([Validators.required])
    }


  }

  checkedIf(rolId:number) {    
    return this.selectedRols.includes(rolId);
  }

  checked($event: MatCheckboxChange) {

    if ($event.checked) {
      this.selectedRols.push($event.source.value)
    } else {
      this.selectedRols = this.selectedRols.filter(i => i != $event.source.value)
    }
   
    
  }

  onSubmit() {
    this.refreshTable = true
    this.formGroup.get('roleIds').setValue(this.selectedRols)
    if (this.selectedRols.length<1)
      this.formGroup.get('roleIds').setErrors({'ee': true})
    if (this.formGroup.valid) {

      this.submitEvent.emit(this.formGroup.value)
    }

    
  }

}
