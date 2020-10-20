import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn, ValidationErrors } from '@angular/forms';
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
  minDate: any;
  maxDate: any;
  today: any;

  constructor(private fb: FormBuilder,
    private patientService: PatientService,
    private doctorService: DoctorserviceService,
    private appointmentService: AppointmentService,
    private router: Router,
    private appComponent: AppComponent) {
    // for date validation starts
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    this.today = yyyy + '-' + mm + '-' + dd;
    // for date validation ends

  }

  ngOnInit() {

    this.addAppointmentFormBuilder();

    // this.appointmentService.getAppointmentList().subscribe((data: any) => {
    //   if (data.success) {
    //     this.appointmentDetailsList = data['listObject'];
    //   } 
    // });


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
      console.log(this.appointmentDetailsList);

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
    // this.addAppointmentForm.setValidators(this.customValidation());
  }

  addAppointmentFormSubmit() {
    if (this.addAppointmentForm.valid && this.appointmentmentTimeValidation ) {
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

  // appointmentTimeValidMsg1: string;
  // appointmentmentTimeValidation1: boolean;
  // checkAppointmentTimeValidation() {
  //   var appointmentTime;
  //   var appointmentDate;
  //   if (!isNullOrUndefined(this.addAppointmentForm.value.doctorName)) {
  //     appointmentTime = this.addAppointmentForm.value.appointmentTime;
  //     appointmentDate = this.addAppointmentForm.value.appointmentDate;
  //   }

  //     this.appointmentDetailsList.forEach(function (appointment) {
  //       console.log(appointment.appointmentDate);
        
  //       if(appointmentDate==appointment.appointmentDate){
  //         if (appointmentTime != appointment.appointmentTime) {
  //           return this.appointmentmentTimeValidation1 = true;
  //         } else {
  //           this.appointmentTimeValidMsg1 = "Appointment already exist for this time, choose a differnet time"
  //           return this.appointmentmentTimeValidation1 = false;
  //         }
  //       }
  //       console.log(appointment.appointmentTime);
  //   });


    // for (var i = 0; i <= this.appointmentDetailsList.length; i++) {      
    //   if (this.appointmentDetailsList[i].appointmentDate == appointmentDate) { 
    //     if ((appointmentTime != this.appointmentDetailsList[i].appointmentTime)) {
    //       return this.appointmentmentTimeValidation1 = true;
    //     } else {
    //       this.appointmentTimeValidMsg1 = "Appointment already exist for this time, choose a differnet time"
    //       return this.appointmentmentTimeValidation1 = false;
    //     }
    //   }
    // }
  // }


  // custom validation starts

  // appointmentTimeInputMsg: string;
  // appointmentTime: string;

  // customValidation(): ValidatorFn {
  //   return (formGroup: FormGroup): ValidationErrors => {
  //     //patientNumber
  //     const appointmentTimeFormGroup = formGroup.controls["appointmentTime"];
  //     const appointmentDateFormGroup = formGroup.controls[""]
  //     if (appointmentTimeFormGroup.value !== "" && appointmentTimeFormGroup.value !== null) {
  //       if (appointmentTimeFormGroup.valid) {
  //         if (!isNullOrUndefined(this.appointmentDetailsList)) {
  //           this.appointmentDetailsList.forEach((data: any) => {
  //             if (data.appointmentDate == appointmentDateFormGroup.value) {
  //               if (data.appointmentTime == appointmentTimeFormGroup.value){
  //               this.appointmentTime = data.appointmentTime;
  //               this.appointmentTimeInputMsg = "Appointment already exist for this time, choose a differnet time";
  //               appointmentTimeFormGroup.setErrors({});
  //             }
  //           }
  //           });
  //         }
  //       } else {
  //         if (this.appointmentTime == appointmentTimeFormGroup.value) {
  //           this.appointmentTimeInputMsg = "Appointment already exist for this time, choose a differnet time";
  //         }
  //       }
  //     } else {
  //       this.appointmentTimeInputMsg = "Please enter this field and it should not start with 0";
  //     }
  //     return;
  //   };
  // }
  // // custom validation ends
}
