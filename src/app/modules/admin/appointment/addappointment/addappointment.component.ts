import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PatientService } from 'src/app/modules/service/patient/patient.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { DoctorserviceService } from 'src/app/modules/service/doctor/doctorservice.service';
import { AppointmentService } from 'src/app/modules/service/appointment/appointment.service';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-addappointment',
  templateUrl: './addappointment.component.html',
  styleUrls: ['./addappointment.component.scss']
})
export class AddappointmentComponent implements OnInit {

  addAppointmentForm: FormGroup;
  phonePattern = "^[0-9_-]{10}$";
  patientDetailsList: any; // all patients in db
  doctorDetailsList: any; // all doctors in db
  singlePatient: any;// single patient by id
  appointmentDetailsList: any; //all appointment in db

  constructor(private fb: FormBuilder,
    private patientService: PatientService,
    private doctorService: DoctorserviceService,
    private appointmentService: AppointmentService,
    private router: Router,
    private appComponent: AppComponent) { }

  ngOnInit() {
    
    this.addAppointmentFormBuilder();

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
  }

  patientDetailsById(patient) {
    this.singlePatient = patient.value;
    this.addAppointmentForm.patchValue({ patientName: this.singlePatient.patientName, phoneNumber: this.singlePatient.phoneNumber })
  }

  addAppointmentFormBuilder() {
    this.addAppointmentForm = this.fb.group({
      patientNumber: [null, [Validators.required, Validators.minLength(3)]],
      patientName: [null, [Validators.required, Validators.minLength(3)]],
      doctorName: [null, [Validators.required, Validators.minLength(3)]],
      appointmentDate: [null, [Validators.required]],
      appointmentTime: [null, [Validators.required]],
      phoneNumber: [
        null,
        [Validators.required, Validators.pattern(this.phonePattern)],
      ],
    });
  }

  addAppointmentFormSubmit() {
    if (this.addAppointmentForm.valid && this.appointmentmentTimeValidation) {
      this.appComponent.startSpinner("Saving data..\xa0\xa0Please wait ...");
      this.appointmentService
        .saveAppointmentDetails(this.addAppointmentForm.value)
        .subscribe(
          (resp: any) => {
            if (resp.success) {
              alert(resp.message);
              this.appComponent.stopSpinner();
              setTimeout(() => {
                if (confirm("Do you want add more appointment ?")) {
                  this.addAppointmentForm.reset();
                  this.appointmentService
                    .getAppointmentList()
                    .subscribe((data: any) => {
                      this.appointmentDetailsList = data.listObject;
                    });
                } else {
                  this.backToAppointmentList();
                }
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

  backToAppointmentList() {
    this.router.navigate(["/home/appointmenthome/listappointment"]);
  }

  appointmentTimeValidMsg: string;
  appointmentmentTimeValidation: boolean;
  checkAppointmentTime() {
    var morningVisitFrom
    var morningVisitTo
    var eveningVisitFrom
    var eveningVisitFrom
    var eveningVisitTo
    var appointmentTime
    if (!isNullOrUndefined(this.addAppointmentForm.value.doctorName)) {
      morningVisitFrom = this.addAppointmentForm.value.doctorName.morningVisitFrom;
      morningVisitTo = this.addAppointmentForm.value.doctorName.morningVisitTo;
      eveningVisitFrom = this.addAppointmentForm.value.doctorName.eveningVisitFrom;
      eveningVisitTo = this.addAppointmentForm.value.doctorName.eveningVisitTo;
      appointmentTime = this.addAppointmentForm.value.appointmentTime;
    }
    if ((appointmentTime >= morningVisitFrom && appointmentTime <= morningVisitTo) || (appointmentTime >= eveningVisitFrom && appointmentTime <= eveningVisitTo)) {
      return this.appointmentmentTimeValidation = true;
    } else {
      this.appointmentTimeValidMsg = "doctor is not available at this time"
      return this.appointmentmentTimeValidation = false;
    }
  }
}
