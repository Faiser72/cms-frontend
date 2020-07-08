import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DefaultComponent } from "./default.component";
import {
  MatSidenavModule,
  MatDividerModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatGridListModule,
  MatListModule,
  MatTableModule,
  MatInputModule,
  MatFormFieldModule,
  MatPaginatorModule,
  MatSort,
  MatIconModule,
  MatCardModule,
  MatProgressBarModule,
  MatRadioModule,
  MatButtonModule,
} from "@angular/material";
import { SharedModule } from "src/app/shared/shared.module";
import { RouterModule } from "@angular/router";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { DashboardComponent } from "src/app/modules/dashboard/dashboard.component";
import { AdminModule } from "src/app/modules/admin/admin.module";
import { DoctorshomeComponent } from "src/app/modules/admin/doctors/doctorshome/doctorshome.component";
import { PatientshomeComponent } from 'src/app/modules/admin/patients/patientshome/patientshome.component';
import { AppointmenthomeComponent } from 'src/app/modules/admin/appointment/appointmenthome/appointmenthome.component';
import { PrescriptionhomeComponent } from 'src/app/modules/admin/prescription/prescriptionhome/prescriptionhome.component';
import { AddprescriptionComponent } from 'src/app/modules/admin/prescription/addprescription/addprescription.component';
import { ListpatienthistoryComponent } from 'src/app/modules/admin/patienthistory/listpatienthistory/listpatienthistory.component';
import { PostsComponent } from 'src/app/modules/posts/posts.component';
import { AddbillconfigurationComponent } from 'src/app/modules/master/billconfiguration/addbillconfiguration/addbillconfiguration.component';
import { MasterModule } from 'src/app/modules/master/master.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    DoctorshomeComponent,
    PatientshomeComponent,
    AppointmenthomeComponent,
    AddprescriptionComponent,
    ListpatienthistoryComponent,
    PrescriptionhomeComponent,
    AddbillconfigurationComponent,
    PostsComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    AdminModule,
    MasterModule,
    MatSidenavModule,
    MatDividerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    MatListModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatIconModule,
    FlexLayoutModule,
    MatCardModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatRadioModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule
  ],
})
export class DefaultModule { }
