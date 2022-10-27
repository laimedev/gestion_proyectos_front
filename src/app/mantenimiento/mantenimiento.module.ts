import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MantenimientoRoutingModule } from './mantenimiento-routing.module';
import { PersonFormComponent } from './person/person-form/person-form.component';
import { PersonListComponent } from './person/person-list/person-list.component';
import { CivilFormComponent } from './civil/civil-form/civil-form.component';
import { CivilListComponent } from './civil/civil-list/civil-list.component';
import { GenderFormComponent } from './gender/gender-form/gender-form.component';
import { GenderListComponent } from './gender/gender-list/gender-list.component';
import { InstructionFormComponent } from './instruction/instruction-form/instruction-form.component';
import { InstructionListComponent } from './instruction/instruction-list/instruction-list.component';
import { UbigeoFormComponent } from './ubigeo/ubigeo-form/ubigeo-form.component';
import { UbigeoListComponent } from './ubigeo/ubigeo-list/ubigeo-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateGenderComponent } from './gender/modal/create-gender/create-gender.component';
import { InfoGenderComponent } from './gender/modal/info-gender/info-gender.component';
import { MatInputModule } from '@angular/material/input';
import { CreateUbigeoComponent } from './ubigeo/modal/create-ubigeo/create-ubigeo.component';

import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { InfoUbigeoComponent } from './ubigeo/modal/info-ubigeo/info-ubigeo.component';
import { CreateInstructionComponent } from './instruction/modal/create-instruction/create-instruction.component';
import { CreateCivilComponent } from './civil/modal/create-civil/create-civil.component';


@NgModule({
  declarations: [
    PersonFormComponent,
    PersonListComponent,
    CivilFormComponent,
    CivilListComponent,
    GenderFormComponent,
    GenderListComponent,
    InstructionFormComponent,
    InstructionListComponent,
    UbigeoFormComponent,
    UbigeoListComponent,
    CreateGenderComponent,
    InfoGenderComponent,
    CreateUbigeoComponent,
    InfoUbigeoComponent,
    CreateInstructionComponent,
    CreateCivilComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    MantenimientoRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSlideToggleModule
  ]
})
export class MantenimientoModule { }
