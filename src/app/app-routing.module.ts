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
import { ViewpatientdiagnosysdetailsComponent } from './modules/admin/patients/viewpatientdiagnosysdetails/viewpatientdiagnosysdetails.component';
import { InvoicehomeComponent } from './modules/admin/invoice/invoicehome/invoicehome.component';
import { ReportsComponent } from './modules/admin/reports/reports/reports.component';
import { PrintreferalnoteComponent } from './modules/admin/print/printreferalnote/printreferalnote.component';
import { PrintprescriptionComponent } from './modules/admin/print/printprescription/printprescription.component';
import { LoginComponent } from './modules/login/login/login.component';
import { UserhomeComponent } from './modules/admin/user/userhome/userhome.component';
import { ListuserComponent } from './modules/admin/user/listuser/listuser.component';
import { AdduserComponent } from './modules/admin/user/adduser/adduser.component';
import { EdituserComponent } from './modules/admin/user/edituser/edituser.component';
import { ChangepasswordComponent } from './modules/login/changepassword/changepassword.component';
import { MyappointmentComponent } from './modules/admin/myappointment/myappointment/myappointment.component';
import { DoctorsappointmentdashboardComponent } from './modules/admin/myappointment/doctorsappointmentdashboard/doctorsappointmentdashboard.component';
import { DoctorrolemasterComponent } from './modules/master/doctormaster/doctorrolemaster/doctorrolemaster.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: "login", component: LoginComponent },
  {
    path: "home",
    component: DefaultComponent,
    children: [
      { path: "", component: DashboardComponent },
      { path: "dashboard", component: DashboardComponent },
      {
        path: "doctorshome",
        component: DoctorshomeComponent,
        children: [
          { path: "adddoctor", component: AdddoctorsComponent },
          { path: "listdoctor", component: ListdoctorsComponent },
          { path: "editdoctor", component: EditdoctorsComponent },
        ],
      },
      { path: "changepassword", component: ChangepasswordComponent },

      {
        path: "usershome", component: UserhomeComponent,
        children: [
          { path: "listUsers", component: ListuserComponent },
          { path: "addUser", component: AdduserComponent },
          { path: "editUsers", component: EdituserComponent }
        ]
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

      { path: "doctorRoleMaster", component: DoctorrolemasterComponent },


      { path: "labtest", component: LabtestComponent },

      { path: "labreports", component: LabreportsComponent },

      { path: "viewpatientdiagnosysdetails", component: ViewpatientdiagnosysdetailsComponent },

      { path: "invoicehome", component: InvoicehomeComponent },

      { path: "reportshome", component: ReportsComponent },

      { path: "printreferalnote", component: PrintreferalnoteComponent },

      { path: "printprescription", component: PrintprescriptionComponent },

      { path: "myAppointment", component: MyappointmentComponent },

      { path: "appointmentDashboard", component: DoctorsappointmentdashboardComponent },

      {
        path: "printhome", component: PrinthomeComponent
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
