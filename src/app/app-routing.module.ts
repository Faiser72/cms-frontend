import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DefaultComponent } from "./layouts/default/default.component";
import { DashboardComponent } from "./modules/dashboard/dashboard.component";
import { DoctorshomeComponent } from "./modules/admin/doctors/doctorshome/doctorshome.component";
import { AdddoctorsComponent } from "./modules/admin/doctors/adddoctors/adddoctors.component";
import { ListdoctorsComponent } from "./modules/admin/doctors/listdoctors/listdoctors.component";
import { EditdoctorsComponent } from "./modules/admin/doctors/editdoctors/editdoctors.component";
import { PatientshomeComponent } from './modules/admin/patients/patientshome/patientshome.component';
import { AddpatientsComponent } from './modules/admin/patients/addpatients/addpatients.component';
import { ListpatientsComponent } from './modules/admin/patients/listpatients/listpatients.component';
import { EditpatientsComponent } from './modules/admin/patients/editpatients/editpatients.component';
import { AppointmenthomeComponent } from './modules/admin/appointment/appointmenthome/appointmenthome.component';
import { AddappointmentComponent } from './modules/admin/appointment/addappointment/addappointment.component';
import { ListappointmentComponent } from './modules/admin/appointment/listappointment/listappointment.component';
import { EditappointmentComponent } from './modules/admin/appointment/editappointment/editappointment.component';
import { PatienthistoryanddiagnosisComponent } from './modules/admin/patients/patienthistoryanddiagnosis/patienthistoryanddiagnosis.component';
import { AddprescriptionComponent } from './modules/admin/prescription/addprescription/addprescription.component';
import { ListprescriptionComponent } from './modules/admin/prescription/listprescription/listprescription.component';
import { ListpatienthistoryComponent } from './modules/admin/patienthistory/listpatienthistory/listpatienthistory.component';
import { PreliminarycheckComponent } from './modules/admin/appointment/preliminarycheck/preliminarycheck.component';
import { LabtestComponent } from './modules/admin/lab/labtest/labtest.component';
import { LabreportsComponent } from './modules/admin/lab/labreports/labreports.component';
import { AddbillconfigurationComponent } from './modules/master/billconfiguration/addbillconfiguration/addbillconfiguration.component';
import { ListbillconfigurationComponent } from './modules/master/billconfiguration/listbillconfiguration/listbillconfiguration.component';
import { PrinthomeComponent } from './modules/admin/print/printhome/printhome.component';
import { ReferalnoteComponent } from './modules/admin/referalnote/referalnote/referalnote.component';

const routes: Routes = [
  {
    path: "",
    component: DefaultComponent,
    children: [
      { path: "", component: DashboardComponent },
      {
        path: "doctorshome",
        component: DoctorshomeComponent,
        children: [
          { path: "adddoctor", component: AdddoctorsComponent },
          { path: "listdoctor", component: ListdoctorsComponent },
          { path: "editdoctor", component: EditdoctorsComponent },
        ],
      },

      {
        path: "patientshome",
        component: PatientshomeComponent,
        children: [
          { path: "addpatient", component: AddpatientsComponent },
          { path: "listpatient", component: ListpatientsComponent },
          { path: "editpatient", component: EditpatientsComponent },
          { path: "patienthistoryanddiagnosis", component: PatienthistoryanddiagnosisComponent },
        ],
      },

      {
        path: "addprescription",
        component: AddprescriptionComponent,
        children: [
          { path: "", component: ListprescriptionComponent },
          { path: "listprescription", component: ListprescriptionComponent },
        ],
      },

      {
        path: "addbillconfiguration",
        component: AddbillconfigurationComponent,
        children: [
          { path: "", component: ListbillconfigurationComponent },
          { path: "listbillconfiguration", component: ListbillconfigurationComponent },
        ],
      },

      { path: "listpatienthistory", component: ListpatienthistoryComponent },

      { path: "labtest", component: LabtestComponent },

      { path: "labreports", component: LabreportsComponent },

      {
        path: "printhome", component: PrinthomeComponent, children: [
          { path: "referalnote", component: ReferalnoteComponent },
        ]
      },

      { path: "referalnote", component: ReferalnoteComponent },

      {
        path: "appointmenthome",
        component: AppointmenthomeComponent,
        children: [
          { path: "addappointment", component: AddappointmentComponent },
          { path: "listappointment", component: ListappointmentComponent },
          { path: "editappointment", component: EditappointmentComponent },
          { path: "preliminarycheck", component: PreliminarycheckComponent },

        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
