import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PatientService } from 'src/app/modules/service/patient/patient.service';
import { DoctorserviceService } from 'src/app/modules/service/doctor/doctorservice.service';
import { AppointmentService } from 'src/app/modules/service/appointment/appointment.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-editappointment',
  templateUrl: './editappointment.component.html',
  styleUrls: ['./editappointment.component.scss']
})
export class EditappointmentComponent implements OnInit {

  editAppointmentForm: FormGroup;
  phonePattern = "^[0-9_-]{10}$";
  patientDetailsList: any; // all patients in db
  doctorDetailsList: any; // all doctors in db
  singlePatient: any;// single patient by id
  appointmentDetailsList: any; //all appointment in db
  appointmentId: any;

  constructor(private fb: FormBuilder,
    private patientService: PatientService,
    private doctorService: DoctorserviceService,
    private appointmentService: AppointmentService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private appComponent: AppComponent) { }


  ngOnInit() {
    this.editAppointmentFormBuilder();

    this.patientService.getPatientList().subscribe((data: any) => {
      if (data.success) {
        this.patientDetailsList = data['listObject'];
      } else {
        alert('please add patient details, then add appoint')
      }
    });

    this.doctorService.getDoctorList().subscribe((data: any) => {
      if (data.success) {
        this.doctorDetailsList = data['listObject'];
      } else {
        alert('sorry no doctors available')
      }
    });

    // all appointmnet list
    this.appointmentService.getAppointmentList().subscribe((data: any) => {
      this.appointmentDetailsList = data.listObject;
    });


    this.route.queryParams.subscribe((data) => {
      this.appointmentId = data.appointmentId;
    });

    this.appointmentService
      .getAppointmentDetails(this.appointmentId)
      .subscribe((data: any) => {
        let doctorName = this.doctorDetailsList.find(
          (jdata: any) =>
            JSON.stringify(jdata) === JSON.stringify(data.object.doctorName)
        ); // To display doctorNAme in field

        let patientNumber = this.patientDetailsList.find(
          (jdata: any) =>
            JSON.stringify(jdata) === JSON.stringify(data.object.patientNumber)
        ); // To display doctorNAme in field

        this.editAppointmentForm.patchValue(data.object);
        this.editAppointmentForm.patchValue({
          doctorName: doctorName, patientNumber: patientNumber
        });
      });
  }

  patientDetailsById(patient) {
    this.singlePatient = patient.value;
    this.editAppointmentForm.patchValue({ patientName: this.singlePatient.patientName, phoneNumber: this.singlePatient.phoneNumber })
  }

  editAppointmentFormBuilder() {
    this.editAppointmentForm = this.fb.group({
      patientNumber: [null, [Validators.required, Validators.minLength(3)]],
      patientName: [null, [Validators.required, Validators.minLength(3)]],
      doctorName: [null, [Validators.required, Validators.minLength(3)]],
      appointmentDate: [null, [Validators.required]],
      appointmentTime: [null, [Validators.required]],
      appointmentId: "",
      phoneNumber: [
        null,
        [Validators.required, Validators.pattern(this.phonePattern)],
      ],
    });
  }

  updateAppointmentDetailsFormSubmit() {
    if (this.editAppointmentForm.valid) {
      this.appComponent.startSpinner("Updating data..\xa0\xa0Please wait ...");
      this.appointmentService.updateAppointmentDetails(this.editAppointmentForm.value).subscribe((data: any) => {
        if (data.success) {
          this.appComponent.stopSpinner();
          alert(data.message)
          this.gotoBack();
          // this._snackBar.open(data.object.candidateName, data.message, { duration: 2500 });
        } else {
          this.appComponent.stopSpinner();
          alert(data.message)
          //this._snackBar.open(data.object.candidateName, data.message, { duration: 2500 });
        }
      });
    } else {
      this.appComponent.stopSpinner();
      alert("Please, fill the proper details.");
      // this._snackBar.open("Error", "Invalid data", { duration: 2500 });
    }
  }

  gotoBack() {
    this.location.back();
  }
}
