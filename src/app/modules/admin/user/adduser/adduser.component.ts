import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { UsersService } from 'src/app/modules/service/users/users.service';
import { AppComponent } from 'src/app/app.component';
import { Location } from '@angular/common';
import { isNullOrUndefined, isUndefined } from 'util';
import { ActivatedRoute } from '@angular/router';
import { DoctorserviceService } from 'src/app/modules/service/doctor/doctorservice.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent implements OnInit {

  addUserForm: FormGroup;
  userDetailsList: any;
  allUsersList: any;
  doctorId: any;
  userTypeList: any;

  constructor(private formBuilder: FormBuilder,
    private doctorService: DoctorserviceService,
    private usersService: UsersService, private route: ActivatedRoute,
    private location: Location, private appComponent: AppComponent) {
    this.route.queryParams.subscribe(params => {
      this.doctorId = params.doctorId;
    });

    //UserTypeRole - Master
    this.usersService.getAllUserType().subscribe(
      (data: any) => {
        this.userTypeList = data.listObject;
        console.log(data.listObject);
      },
      (error) => {
        console.log(error, "Error Caught");
      }
    );
  }

  ngOnInit() {
    this.usersService.getAllUserDetails().subscribe((data: any) => {
      this.userDetailsList = data.listObject;
    });

    this.usersService.getAllUsers().subscribe((data: any) => {
      this.allUsersList = data.listObject;
    });

    this.addUserFormBuilder();
  }

  addUserFormBuilder() {
    this.addUserForm = this.formBuilder.group({
      username: [null, [Validators.required, Validators.minLength(3), Validators.pattern("^[a-zA-Z \s]+$")]],
      displayName: [null, [Validators.required, Validators.minLength(3), Validators.pattern("^[0-9a-zA-Z. \s]+$")]],
      emailId: [null,
        [
          Validators.compose([
            Validators.required,
            Validators.pattern("^[a-zA-Z0-9._-]+@[a-zA-Z]+.[a-zA-Z]{2,4}$")
          ])
        ]
      ],
      userType: [null, [Validators.required]],
      mobileNo: [null, [Validators.required, Validators.pattern("^[0-9]{10}$")]],
      // doctor:""
    });
    this.addUserForm.setValidators(this.customValidation());

    if (!isUndefined(this.doctorId)) {
      if (this.doctorId != 0) {
        this.doctorService.getDoctorDetails(this.doctorId).subscribe((data: any) => {
          let doctorDetails = data.object;
          // this.addUserForm.patchValue({doctor:doctorDetails})
          console.log(doctorDetails);
          this.addUserForm.patchValue({ displayName: doctorDetails.doctorName, emailId: doctorDetails.emailId, mobileNo: doctorDetails.phoneNumber })
        });
      }
    } else {
      this.doctorId = 0;
    }
  }

  usernameInputMsg: string; username: string;
  displayNameInputMsg: string;
  emailIdInputMsg: string; emailId: string;
  mobileNoInputMsg: string; mobileNo: string;
  customValidation(): ValidatorFn {
    return (formGroup: FormGroup): ValidationErrors => {
      //username
      const usernameFormGroup = formGroup.controls['username'];
      if (usernameFormGroup.value !== '' && usernameFormGroup.value !== null) {
        if (usernameFormGroup.valid) {
          if (!isNullOrUndefined(this.allUsersList)) {
            this.allUsersList.forEach((data: any) => {
              if (data.username.toLowerCase() == usernameFormGroup.value.toLowerCase()) {
                this.username = data.username.toLowerCase();
                this.usernameInputMsg = 'This username already exist.';
                usernameFormGroup.setErrors({});
              }
            });
          }
        } else {
          if (this.username == usernameFormGroup.value.toLowerCase()) {
            this.usernameInputMsg = 'This username already exist.';
          } else {
            this.usernameInputMsg = 'Please enter only alphabets, min:3 characters.';
          }
        }
      } else {
        this.usernameInputMsg = 'Please enter this field.';
      }
      //dispalyName
      const displayNameFormGroup = formGroup.controls['displayName'];
      if (displayNameFormGroup.value !== '' && displayNameFormGroup.value !== null) {
        if (displayNameFormGroup.invalid) {
          this.displayNameInputMsg = 'Please enter only alphanumerics, min:3 characters.';
        }
      } else {
        this.displayNameInputMsg = 'Please enter this field.';
      }
      //emailId
      const emailIdFormGroup = formGroup.controls['emailId'];
      if (emailIdFormGroup.value !== '' && emailIdFormGroup.value !== null) {
        if (emailIdFormGroup.valid) {
          if (!isNullOrUndefined(this.userDetailsList)) {
            this.userDetailsList.forEach((data: any) => {
              if (data.emailId == emailIdFormGroup.value.toLowerCase()) {
                this.emailId = data.emailId;
                this.emailIdInputMsg = 'This emailId already exist.';
                emailIdFormGroup.setErrors({});
              }
            });
          }
        } else {
          if (this.emailId == emailIdFormGroup.value.toLowerCase()) {
            this.emailIdInputMsg = 'This emailId already exist.';
          } else {
            this.emailIdInputMsg = 'Please enter valid emailId.';
          }
        }
      } else {
        this.emailIdInputMsg = 'Please enter this field.';
      }
      //mobileNo.
      const mobileNoFormGroup = formGroup.controls['mobileNo'];
      if (mobileNoFormGroup.value !== '' && mobileNoFormGroup.value !== null) {
        if (mobileNoFormGroup.valid) {
          if (!isNullOrUndefined(this.userDetailsList)) {
            this.userDetailsList.forEach((data: any) => {
              if (data.mobileNo == mobileNoFormGroup.value) {
                this.mobileNo = data.mobileNo;
                this.mobileNoInputMsg = 'This mobile no. already exist.';
                mobileNoFormGroup.setErrors({});
              }
            });
          }
        } else {
          if (this.mobileNo == mobileNoFormGroup.value) {
            this.mobileNoInputMsg = 'This mobile no. already exist.';
          } else {
            this.mobileNoInputMsg = 'Please enter 10 digit valid mobile No.';
          }
        }
      } else {
        this.mobileNoInputMsg = 'Please enter this field.';
      }
      return;
    };
  }

  saveUserDetails() {
    if (this.addUserForm.valid) {
      console.log(this.doctorId);
      this.appComponent.startSpinner("Saving data..\xa0\xa0Please wait ...");
      this.usersService.saveUserDetails(this.addUserForm.value).subscribe((resp: any) => {
        if (resp.success) {
          alert(resp.message);
          this.appComponent.stopSpinner();
          setTimeout(() => {
            this.doctorId = 0;
            if (confirm("Do you want add more users ?")) {
              this.addUserForm.reset();
              this.usersService.getAllUserDetails().subscribe((data: any) => {
                this.userDetailsList = data.listObject;
              });
              this.usersService.getAllUsers().subscribe((data: any) => {
                this.allUsersList = data.listObject;
              });
            } else {
              this.gotoBack();
            }
          }, 500);
        } else {
          setTimeout(() => {
            alert(resp.message);
            this.appComponent.stopSpinner();
          }, 1000);
        }
      }, (error) => {
        setTimeout(() => {
          alert("Error! - Something Went Wrong! Try again.");
          this.appComponent.stopSpinner();
        }, 1000);
      });
    } else {
      alert("Please, fill the proper details.");
    }
  }

  gotoBack = () => {
    this.location.back();
  };


}
