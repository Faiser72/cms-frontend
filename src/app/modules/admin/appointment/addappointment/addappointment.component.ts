import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PatientService } from 'src/app/modules/service/patient/patient.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { DoctorserviceService } from 'src/app/modules/service/doctor/doctorservice.service';

@Component({
  selector: 'app-addappointment',
  templateUrl: './addappointment.component.html',
  styleUrls: ['./addappointment.component.scss']
})
export class AddappointmentComponent implements OnInit {

  addAppointmentForm: FormGroup;
  phonePattern = "^[0-9_-]{10}$";
  patientDetailsList: any; // all patients in db
  doctorDetailsList:any; // all doctors in db
  singlePatient:any;// single patient by id

  constructor(private fb: FormBuilder,
    private patientService: PatientService,
    private doctorService:DoctorserviceService) { }

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
  }

  patientDetailsById(patient){
    this.singlePatient=patient.value;
    console.log("change",this.singlePatient);
    this.addAppointmentForm.patchValue({patientName:this.singlePatient.patientName, phoneNumber:this.singlePatient.phoneNumber})
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
    console.log(this.addAppointmentForm.value);

  }

}
