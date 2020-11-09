import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { PatientService } from 'src/app/modules/service/patient/patient.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { ReferalService } from 'src/app/modules/service/referal/referal.service';
import { PrescriptionService } from 'src/app/modules/service/prescription/prescription.service';
import { isNullOrUndefined } from 'util';
import { Prescription } from '../../prescription/prescriptionmodel';
import { PatientdiagnosisService } from 'src/app/modules/service/patientdiagnosis/patientdiagnosis.service';

@Component({
  selector: 'app-printprescription',
  templateUrl: './printprescription.component.html',
  styleUrls: ['./printprescription.component.scss']
})
export class PrintprescriptionComponent implements OnInit {

  patientNumber;
  patientName;
  doctorName;
  date;
  age;
  investigation;
  diagnosis;
  followUpDate;

  prescriptionForm: FormGroup;

  isShown: boolean = false; // hidden by default
  patientDetailsList: any;
  patientDetails: any;
  patientId: any;
  prescriptionDetailsList: any;

  constructor(private router: Router,
    private patientService: PatientService,
    private fb: FormBuilder,
    private appComponent: AppComponent,
    private referalService: ReferalService,
    private prescriptionService: PrescriptionService,
    private patientDiagnosisService: PatientdiagnosisService) { }

  ngOnInit() {

    this.prescriptionFormBuilder();

    // for patient details
    this.patientService.getPatientList().subscribe((data: any) => {
      this.patientDetailsList = data['listObject'];
    })
  }

  prescriptionFormBuilder() {
    this.prescriptionForm = this.fb.group({
      patientNumber: [null, [Validators.required]],
      patientName: [null, [Validators.required]],
      appointmentDate: [null, [Validators.required]],
    });
  }

  patientDetailsById(patient) {
    if (!isNullOrUndefined(patient)) {
      this.patientService.getPatientDetails(patient.value.patientId).subscribe((data: any) => {
        this.patientDetails = data.object;
        this.patientId = this.patientDetails.patientId;
        this.prescriptionForm.patchValue({ patientName: this.patientDetails.patientName })
      })
    }
  }

  getPrescription() {
    if (this.prescriptionForm.valid) {
      this.appComponent.startSpinner("getting data..\xa0\xa0Please wait ...");
      this.prescriptionService
        .getPrescriptionDetailsByPatientIdAndDate(this.patientId, this.prescriptionForm.value.appointmentDate)
        .subscribe(
          (resp: any) => {
            if (resp.success) {
              this.prescriptionDetailsList = resp.object;
              console.log(this.prescriptionDetailsList.appointment.appointmentId);
              this.patientDiagnosisService.getPatientDiagnosisDetailsByAppointmentId(this.prescriptionDetailsList.appointment.appointmentId).subscribe((data: any) => {
                console.log(data);
                this.investigation = data.object.investigation;
                this.diagnosis = data.object.diagnosis;
                this.followUpDate = data.object.followUpdate
console.log(data.object.investigation);

              })
              this.patientName = this.prescriptionDetailsList.patient.patientName;
              this.doctorName = this.prescriptionDetailsList.doctorName.doctorName;
              this.age = this.prescriptionDetailsList.patient.age;
              this.date = this.prescriptionDetailsList.appointment.appointmentDate;
              this.getRowDetails(this.prescriptionDetailsList);
              alert(resp.message);
              this.appComponent.stopSpinner();
              setTimeout(() => {
                this.toggleShow();
              }, 500);
            } else {
              setTimeout(() => {
                alert(resp.message);
                this.appComponent.stopSpinner();
              }, 1000);
            }
          },
          (error) => {
            setTimeout(() => {
              alert("Error! - Something Went Wrong! Try again.");
              this.appComponent.stopSpinner();
            }, 1000);
          }
        );
    } else {
      alert("Please, fill the proper details.");
    }
  }

  prescriptionDetails: Array<Prescription> = [];
  prescription: any = {};
  getRowDetails(data: any) {
    this.prescriptionDetails = [];
    let drugName: any = [];
    let strength: any = [];
    let morningDosage: any = [];
    let afternoonDosage: any = [];
    let nightDosage: any = [];
    let duration: any = [];
    let remarks: any = [];
    if (!isNullOrUndefined(data.drugName)) {
      drugName = data.drugName.split(',');
      strength = data.strength.split(',');
      morningDosage = data.morningDosage.split(',');
      afternoonDosage = data.afternoonDosage.split(',');
      nightDosage = data.nightDosage.split(',');
      duration = data.duration.split(',');
      remarks = data.remarks.split(',');
      if (drugName.length == duration.length) {
        for (let i = 0; i < drugName.length; i++) {
          this.prescription = { drugName: drugName[i], strength: strength[i], morningDosage: morningDosage[i], afternoonDosage: afternoonDosage[i], nightDosage: nightDosage[i], remarks: remarks[i], duration: duration[i] };
          this.prescriptionDetails.push(this.prescription);
        }
      }
    }
  }


  toggleShow() {
    this.isShown = !this.isShown;
  }

  printPrescription(cmpName) {
    let printContents = document.getElementById(cmpName).innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    location.reload();
  }

  backToPrintHome() {
    this.router.navigate(['home/printhome'])
  }
}
