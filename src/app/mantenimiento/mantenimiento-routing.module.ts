import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../services/guard/auth.guard';
import { CivilListComponent } from './civil/civil-list/civil-list.component';
import { CivilFormComponent } from './civil/civil-form/civil-form.component';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { GenderListComponent } from './gender/gender-list/gender-list.component';
import { GenderFormComponent } from './gender/gender-form/gender-form.component';
import { InstructionListComponent } from './instruction/instruction-list/instruction-list.component';
import { InstructionFormComponent } from './instruction/instruction-form/instruction-form.component';
import { PersonListComponent } from './person/person-list/person-list.component';
import { PersonFormComponent } from './person/person-form/person-form.component';
import { UbigeoListComponent } from './ubigeo/ubigeo-list/ubigeo-list.component';
import { UbigeoFormComponent } from './ubigeo/ubigeo-form/ubigeo-form.component';


const routes: Routes = [
  {
    path: 'admin', canActivate: [AuthGuard], children: [
      { path: 'civil.list', component: CivilListComponent },
      { path: 'civil.form', component: CivilFormComponent },

      { path: 'gender.list', component: GenderListComponent },
      { path: 'gender.form', component: GenderFormComponent },

      { path: 'instruction.list', component: InstructionListComponent },
      { path: 'instruction.form', component: InstructionFormComponent },

      { path: 'person.list', component: PersonListComponent },
      { path: 'person.form', component: PersonFormComponent },

      { path: 'ubigeo.list', component: UbigeoListComponent },
      { path: 'ubigeo.form', component: UbigeoFormComponent },

 
      { path: '', component: HeaderComponent, outlet: 'header' },
      { path: '', component: SidebarComponent, outlet: 'sidebar' }
    ]
  },
];

@NgModule({
  // declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MantenimientoRoutingModule { }
