import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-addpatients',
  templateUrl: './addpatients.component.html',
  styleUrls: ['./addpatients.component.scss']
})
export class AddpatientsComponent implements OnInit {


  addPatientDetailsForm: FormGroup;
  phonePattern = "^[0-9_-]{10,12}$";

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.addPatientDetailsFormBuilder();
  }

   //Form Validation
   addPatientDetailsFormBuilder() {
    this.addPatientDetailsForm = this.fb.group({
      patientName: [null, [Validators.required, Validators.minLength(3)]],
      patientNumber: [null, [Validators.required]],
      dob: [null, [Validators.required]],
      phoneNumber:[null,[Validators.required, Validators.pattern(this.phonePattern)]],
      emailId: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"),
        ]),
      ],
      gender:[null,[Validators.required]],
      address: [null, [Validators.required, Validators.minLength(3)]],
      reasonForVisit: [null, [Validators.required, Validators.minLength(3)]],
      registeredDate: [null, [Validators.required]],
      doctorAassigned: "",
      emergencyContactName:[null, [Validators.required, Validators.minLength(3)]],
      emergencyContactNumber:[null,[Validators.required, Validators.pattern(this.phonePattern)]],
      emergencyContactRelation:[null, [Validators.required, Validators.minLength(3)]],
    });
  }


  ageFromDateOfBirth(dob){

  }

  addPatientDetailsFormSubmit(){
    console.log("values", this.addPatientDetailsForm.value);
  }
}
