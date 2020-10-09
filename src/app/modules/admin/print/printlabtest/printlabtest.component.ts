import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PatientService } from 'src/app/modules/service/patient/patient.service';
import { AppComponent } from 'src/app/app.component';
import { ReferalService } from 'src/app/modules/service/referal/referal.service';
import { PrescriptionService } from 'src/app/modules/service/prescription/prescription.service';
import { isNullOrUndefined } from 'util';
import { LabtestService } from 'src/app/modules/service/labtest/labtest.service';

@Component({
  selector: 'app-printlabtest',
  templateUrl: './printlabtest.component.html',
  styleUrls: ['./printlabtest.component.scss']
})
export class PrintlabtestComponent implements OnInit {

  patientNumber;
  patientName;
  doctorName
  date;

  addLabTestForm: FormGroup;

  referalNote: FormGroup;

  // checkbox starts
  completeheamogram = false;
  bloodGrouprhtype = false;
  postPrandialBloodSugar = false;
  bloodUrea = false;
  bloodUreaNitrogen = false;
  serumCreatinine = false;
  uricAcid = false;
  lipidProfile = false;
  liverFunctionTest = false;
  tsh = false;
  serumCalcium = false;
  hivElisa = false;
  hbsagElisa = false;
  urineRoutine = false;
  chestXRay = false;
  Echocardiogram = false;
  treadmillTest = false;
  ultraSoundAbdomenAndPelvis = false;
  urineCompleteAnalysis = false;
  ecg = false;
  esr = false;
  asloQuantitative = false;
  raQuantitative = false;
  crpQuantitative = false;
  anaElisa = false;
  lh = false;
  prolactin = false;
  fshLHRatio = false;
  glycatedHb = false;
  electrolytes = false;

  isShown: boolean = false; // hidden by default
  patientDetailsList: any;
  patientDetails: any;
  patientId: any;
  prescriptionDetailsList: any;
  LabTestDetailsList: any;

  constructor(private router: Router,
    private patientService: PatientService,
    private fb: FormBuilder,
    private appComponent: AppComponent,
    private referalService: ReferalService,
    private prescriptionService: PrescriptionService,
    private labtestService: LabtestService) { }

  ngOnInit() {

    this.referalNoteBuilder();
    this.addLabTestFormBuilder();

    // for patient details
    this.patientService.getPatientList().subscribe((data: any) => {
      this.patientDetailsList = data['listObject'];
    })
  }

  referalNoteBuilder() {
    this.referalNote = this.fb.group({
      patientNumber: [null, [Validators.required]],
      patientName: [null, [Validators.required]],
      appointmentDate: [null, [Validators.required]],
    });
  }

  addLabTestFormBuilder() {
    this.addLabTestForm = this.fb.group({
      completeheamogram: '',
      bloodGrouprhtype: '',
      postPrandialBloodSugar: '',
      bloodUrea: '',
      bloodUreaNitrogen: '',
      serumCreatinine: '',
      uricAcid: '',
      lipidProfile: '',
      liverFunctionTest: '',
      tsh: '',
      serumCalcium: '',
      hivElisa: '',
      hbsagElisa: '',
      urineRoutine: '',
      chestXRay: '',
      Echocardiogram: '',
      treadmillTest: '',
      ultraSoundAbdomenAndPelvis: '',
      urineCompleteAnalysis: '',
      ecg: '',
      esr: '',
      asloQuantitative: '',
      raQuantitative: '',
      crpQuantitative: '',
      anaElisa: '',
      lh: '',
      prolactin: '',
      fshLHRatio: '',
      glycatedHb: '',
      electrolytes: '',
      problemSuspected: '',
      patient: '',
      appointment: '',
      doctor: '',
      date: '',
      labTestId: ''
    })
  }

  patientDetailsById(patient) {
    if (!isNullOrUndefined(patient)) {
      this.patientService.getPatientDetails(patient.value.patientId).subscribe((data: any) => {
        this.patientDetails = data.object;
        this.patientId = this.patientDetails.patientId;
        this.referalNote.patchValue({ patientName: this.patientDetails.patientName })
      })
    }
  }

  getLabTest() {
    if (this.referalNote.valid) {
      this.appComponent.startSpinner("getting data..\xa0\xa0Please wait ...");
      this.labtestService
        .getLabTestDetailsByPatientIdAndDate(this.patientId, this.referalNote.value.appointmentDate)
        .subscribe(
          (resp: any) => {
            if (resp.success) {
              this.LabTestDetailsList = resp.object;
              console.log(resp.object.problemSuspected);

              this.addLabTestForm.patchValue(resp.object);
              this.addLabTestForm.patchValue({ problemSuspected: resp.object.problemSuspected })
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



  toggleShow() {
    this.isShown = !this.isShown;
  }

  printLabTest(cmpName) {
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
