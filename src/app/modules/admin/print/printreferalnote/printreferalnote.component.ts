import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PatientService } from 'src/app/modules/service/patient/patient.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { AppComponent } from 'src/app/app.component';
import { ReferalService } from 'src/app/modules/service/referal/referal.service';

@Component({
  selector: 'app-printreferalnote',
  templateUrl: './printreferalnote.component.html',
  styleUrls: ['./printreferalnote.component.scss']
})
export class PrintreferalnoteComponent implements OnInit {

  today: any;
  patientName: String;
  age: any;
  date: any;
  doctorName: any;
  remarks: any;

  referalNote: FormGroup;
  patientNumber;
  // patientName;
  // doctorName
  // date;

  isShown: boolean = false;
  patientDetailsList: any;
  patientDetails: any;
  patientId: any;
  referenceDetails: any;

  constructor(private router: Router,
    private patientService: PatientService,
    private fb: FormBuilder,
    private appComponent:AppComponent,
    private referalService:ReferalService) { }

  ngOnInit() {
    this.referalNoteBuilder();

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    this.today = dd + '-' + mm + '-' + yyyy;

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

  patientDetailsById(patient) {    
    if (!isNullOrUndefined(patient)) {
      this.patientService.getPatientDetails(patient.value.patientId).subscribe((data: any) => {
        this.patientDetails = data.object;
        this.patientId=this.patientDetails.patientId;        
        this.referalNote.patchValue({ patientName: this.patientDetails.patientName })
      })
    }
  }

  getReferalNote(){
    if (this.referalNote.valid) {
      this.appComponent.startSpinner("getting data..\xa0\xa0Please wait ...");
      this.referalService
        .getReferenceDetailsByPatientIdAndDate(this.patientId,this.referalNote.value.appointmentDate)
        .subscribe(
          (resp: any) => {
            if (resp.success) {
              this.referenceDetails=resp.object;
              console.log(this.referenceDetails);
              this.patientName=this.referenceDetails.patientId.patientName;
              this.age=this.referenceDetails.patientId.age;
              this.doctorName=this.referenceDetails.doctorId.doctorName;
              this.remarks=this.referenceDetails.remarks;
              this.date=this.referenceDetails.date;
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

  printReferal(cmpName) {
    let printContents = document.getElementById(cmpName).innerHTML;
    let originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
  }

  backToPrintHome() {
    this.router.navigate(['home/printhome'])
  }

}
