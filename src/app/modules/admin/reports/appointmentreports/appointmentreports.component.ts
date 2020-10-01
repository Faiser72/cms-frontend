import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { PatientService } from 'src/app/modules/service/patient/patient.service';
import { AppComponent } from 'src/app/app.component';
import { AppointmentService } from 'src/app/modules/service/appointment/appointment.service';
import { PrescriptionService } from 'src/app/modules/service/prescription/prescription.service';
import { DoctorrolemasterserviceService } from 'src/app/modules/service/doctorrolemaster/doctorrolemasterservice.service';
import { DoctorserviceService } from 'src/app/modules/service/doctor/doctorservice.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-appointmentreports',
  templateUrl: './appointmentreports.component.html',
  styleUrls: ['./appointmentreports.component.scss']
})
export class AppointmentreportsComponent implements OnInit {

  appointmentReportForm: FormGroup;

  isShown: boolean = false; // hidden by default
  isShown1: boolean = false; // hidden by default

  dataSource: any;
  displayedColumns: string[] = [
    "slNo",
    "patientName",
    "doctorName",
    "appointmentDate",
    "appointmentTime"
    // "total"
    // "action"
  ];

  dataSource1: any;
  displayedColumns1: string[] = [
    "slNo",
    "patientName",
    // "doctorName",
    "appointmentDate",
    "appointmentTime"
    // "total"
    // "action"
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  appointmentDetailsList: any;
  doctorDetailsList: any;
  appointmentReportOfDoctorsForm: FormGroup;
  appointmentDetailsListOfDoctor: any;
  doctorId: any;

  constructor(private router: Router,
    private patientService: PatientService,
    private fb: FormBuilder,
    private location: Location,
    private appComponent: AppComponent,
    private appointmentService: AppointmentService,
    private prescriptionService: PrescriptionService,
    private doctorService: DoctorserviceService) { }

  ngOnInit() {
    this.appointmentReportFormBuilder();
    this.appointmentReportOfDoctorsFormBuilder();
    this.doctorService.getDoctorList().subscribe((data: any) => {
      if (data.success) {
        this.doctorDetailsList = data['listObject'];
      } else {
        alert('sorry no doctors available')
      }
    });
  }

  appointmentReportFormBuilder() {
    this.appointmentReportForm = this.fb.group({
      fromDate: [null, [Validators.required]],
      toDate: [null, [Validators.required]],
    });
  }

  appointmentReportOfDoctorsFormBuilder() {
    this.appointmentReportOfDoctorsForm = this.fb.group({
      fromDate: [null, [Validators.required]],
      toDate: [null, [Validators.required]],
      doctorName: [null, [Validators.required]]
    });
  }

  getAppointmentDetailsByDate() {
    this.appointmentService.getAllAppointmentsDetailsBtwnDates(this.appointmentReportForm.value.fromDate, this.appointmentReportForm.value.toDate).subscribe((data: any) => {
      this.appComponent.startSpinner("getting data..\xa0\xa0Please wait ...");
      if (data.success) {
        this.appointmentDetailsList = data['listObject'];
        this.dataSource = new MatTableDataSource(data['listObject']);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        setTimeout(() => {
          this.toggleShow();
          this.appComponent.stopSpinner();
        }, 500);
      } else {
        this.dataSource = new MatTableDataSource();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
        setTimeout(() => {
          alert('sorry No patients tested between this date')
          this.appComponent.stopSpinner();
        }, 1000);
      }
    });
  }
  toggleShow() {
    this.isShown = !this.isShown;
  }

  toggleShow1() {
    this.isShown1 = !this.isShown1;
  }

  printPrescription(cmpName) {
    let printContents = document.getElementById(cmpName).innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    location.reload();
  }

  printAppointmentDoctors(cmpName) {
    let printContents = document.getElementById(cmpName).innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    location.reload();
  }

  backToReportsHome() {
    this.location.back();
  }

  getAppointmentDetailsOfDoctorByDate() {
    this.appointmentService.getAllAppointmentsDetailsOfDoctorBtwnDates(this.appointmentReportOfDoctorsForm.value.doctorName.doctorId, this.appointmentReportOfDoctorsForm.value.fromDate, this.appointmentReportOfDoctorsForm.value.toDate).subscribe((data: any) => {
      this.appComponent.startSpinner("getting data..\xa0\xa0Please wait ...");
      if (data.success) {
        this.appointmentDetailsListOfDoctor = data['listObject'];
        this.dataSource1 = new MatTableDataSource(data['listObject']);
        this.dataSource1.paginator = this.paginator;
        this.dataSource1.sort = this.sort;
        setTimeout(() => {
          this.toggleShow1();
          this.appComponent.stopSpinner();
        }, 500);
      } else {
        this.dataSource1 = new MatTableDataSource();
        this.dataSource1.paginator = this.paginator;
        this.dataSource1.sort = this.sort
        setTimeout(() => {
          alert('sorry No patients tested between this date')
          this.appComponent.stopSpinner();
        }, 1000);
      }
    });
  }
}