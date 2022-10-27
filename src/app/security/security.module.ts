import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';

import { SecurityRoutingModule } from './security-routing.module';
import { UserListComponent } from './user/user-list/user-list.component';
import { RolListComponent } from './roles/rol-list/rol-list.component';
import { MatSortModule } from '@angular/material/sort';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressBarModule} from '@angular/material/progress-bar'; 

import {UtilsModule} from '../utils/utils.module';
import { CreateRolComponent } from './roles/modal/create-rol/create-rol.component';
import { EditRolComponent } from './roles/modal/edit-rol/edit-rol.component';
import { CreateUserComponent } from './user/modal/create-user/create-user.component';
import { UserFormComponent } from './user/user-form/user-form.component';
import { UserInfoComponent } from './user/modal/user-info/user-info.component';
import { EditUserComponent } from './user/modal/edit-user/edit-user.component';
import { DeleteUserComponent } from './user/modal/delete-user/delete-user.component';
import { RoleFormComponent } from './roles/role-form/role-form.component'
import { MatPaginatorModule } from '@angular/material/paginator';
import { ViewRolComponent } from './roles/modal/view-rol/view-rol.component';
import { DeleteRolComponent } from './roles/modal/delete-rol/delete-rol.component';
import { LoadingOverlayComponent } from '../utils/components/loading-overlay/loading-overlay.component';
import { KpisListComponent } from './kpis/kpis-list/kpis-list.component';
import { DeleteKpiComponent } from './kpis/modal/delete-kpi/delete-kpi.component';
import { CreateKpiComponent } from './kpis/modal/create-kpi/create-kpi.component';
import { KpiFormComponent } from './kpis/kpi-form/kpi-form.component';
import { EditKpiComponent } from './kpis/modal/edit-kpi/edit-kpi.component';

@NgModule({
  declarations: [UserListComponent, RolListComponent, CreateRolComponent, EditRolComponent, CreateUserComponent, UserFormComponent, UserInfoComponent, EditUserComponent, DeleteUserComponent, RoleFormComponent, ViewRolComponent, DeleteRolComponent, KpisListComponent, DeleteKpiComponent, CreateKpiComponent, KpiFormComponent, EditKpiComponent],
  imports: [
    CommonModule,
    SecurityRoutingModule,
    MatTableModule,
    MatSortModule,
    MatDatepickerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatNativeDateModule,
    UtilsModule,
    MatDialogModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatProgressBarModule,
    
  ],
  entryComponents: [CreateRolComponent]
})
export class SecurityModule { }
