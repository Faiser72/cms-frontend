import { Component, OnInit } from "@angular/core";
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DoctorrolemasterserviceService } from 'src/app/modules/service/doctorrolemaster/doctorrolemasterservice.service';
import { DoctorserviceService } from 'src/app/modules/service/doctor/doctorservice.service';
import { AppComponent } from 'src/app/app.component';
import { isNullOrUndefined } from 'util';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: "app-adddoctors",
  templateUrl: "./adddoctors.component.html",
  styleUrls: ["./adddoctors.component.scss"],
})

export class AdddoctorsComponent implements OnInit {

  addDoctorDetailsForm: FormGroup;
  phonePattern = "^[0-9_-]{10,12}$";

  age: number;

  // fileUploads
  uploadFiles = new FormData();
  photoFile: FileList;
  resumeFile: FileList;
  resumecvFile: string | Blob;
  ppFile: string | Blob;
  placeholder_path: string;
  resumeFileName: string;
  doctorPhotoName: string;
  photoMessage: string;
  resumeMessage: string;
  doctorRoleList: any;

  roles = [
    { value: 'consultant-0', viewValue: 'Consultant' },
    { value: 'dutyDoctor-1', viewValue: 'Duty Doctor' },
    { value: 'surgen-2', viewValue: 'Surgen' }
  ];

  constructor(private fb: FormBuilder,
    private doctorRoleMasterService: DoctorrolemasterserviceService,
    private doctorService: DoctorserviceService,
    private appComponent: AppComponent,
    private router: Router
  ) {
    this.placeholder_path = "../../../../assets/Placeholder.jpg";

    //DoctorRole - Master
    this.doctorRoleMasterService.getDoctorRoleMasterList().subscribe(
      (data: any) => {
        console.log(data);
        
        this.doctorRoleList = data.listObject;
        console.log(data.listObject,"aaaa");

      },
      (error) => {
        console.log(error, "Error Caught");
      }
    );
  }


  ngOnInit() {
    this.addDoctorDetailsFormBuilder();
    console.log('roleList', this.doctorRoleList);

  }

  addDoctorDetailsFormBuilder() {
    this.addDoctorDetailsForm = this.fb.group({
      doctorName: [null, [Validators.required, Validators.minLength(3)]],
      qualification: [null, [Validators.required]],
      specialization: [null, [Validators.required]],
      avatar: [null],
      dob: [
        null,
        [
          Validators.required
        ],
      ],
      age: [
        null,
        [
          ,
          Validators.required
          // AgeValidator,
        ],
      ],
      emailId: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9._-]+@[a-zA-Z]+.[a-zA-Z]{2,4}$"),
        ]),
      ],
      gender: [null, [Validators.required]],
      experience: [null, [Validators.required]],
      joiningDate: [null, [Validators.required]],
      leavingDate: "",
      morningVisitFrom: [null, [Validators.required]],
      morningVisitTo: [null, [Validators.required]],
      eveningVisitFrom: [null, [Validators.required]],
      eveningVisitTo: [null, [Validators.required]],
      address: [null, [Validators.required, Validators.minLength(3)]],
      phoneNumber: [
        null,
        [Validators.required, Validators.pattern(this.phonePattern)],
      ],
      doctorRole: [null, [Validators.required]],
      panNo: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}$"),
        ]),
      ],
      aadharNo: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern("^[0-9]{12}$"),
        ]),
      ],
    });
  }


  getPhotoFile(photoUpload: HTMLInputElement, event: any) {
    const fileName = event.target.files[0].name;
    this.photoFile = photoUpload.files;

    if (this.photoFile.length === 0) return;

    let mimeType = this.photoFile[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.placeholder_path = "../../../../assets/Placeholder.jpg";
      this.photoMessage = "Only image files are supported.";
      this.doctorPhotoName = "No File Chosen";
      return;
    } else {
      let reader = new FileReader();
      reader.readAsDataURL(this.photoFile[0]);
      reader.onload = (_event) => {
        this.placeholder_path = reader.result as string;
        this.doctorPhotoName = fileName;
      };
      this.photoMessage = null;
      this.ppFile = event.target.files[0];
    }
  }

  ageFromDateOfBirth(dateOfBirth: any): number {
    console.log(dateOfBirth.value);

    if (dateOfBirth != null) {
      const today = new Date();
      const birthDate = new Date(dateOfBirth.value);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (isNaN(age)) {
        age = null
      }
      this.addDoctorDetailsForm.patchValue({ age: age });
      return (this.age = age);
    }
  }


  addDoctorDetailsFormSubmit() {
    if (this.addDoctorDetailsForm.valid) {
      this.appComponent.startSpinner("Saving data..\xa0\xa0Please wait ...");
      this.doctorService.saveDoctorDetails(this.addDoctorDetailsForm.value).subscribe((data: any) => {
        if (data.success) {
          if (!isNullOrUndefined(this.ppFile)) {
            const profileFormData = new FormData();
            profileFormData.append('profilePicture', this.ppFile);
            profileFormData.append("doctorId", data.object.doctorId);
            this.doctorService.saveOrUpdateProfilePhoto(profileFormData).subscribe((resp: any) => {
              if (resp.success) {
                this.placeholder_path = "../../../../assets/Placeholder.jpg";
                this.doctorPhotoName = "No File Chosen";
                alert("Data saved ! file uploaded.")
                alert('please add the login credintials to this user')
                // if (confirm("Do you want to add login details for this doctor.?")) {
                this.addDoctorDetailsForm.reset();
                let navigationExtras: NavigationExtras = {
                  queryParams: {
                    doctorId: data.object.doctorId,
                  }
                };
                this.router.navigate(["/home/usershome/addUser"], navigationExtras);
                // } else {
                // setTimeout(() => {
                //   this.gotoBack();
                // }, 500);
                // }
                this.appComponent.stopSpinner();
              } else {
                alert("Data saved ! But fails to upload file")
                alert('please add the login credintials to this user')
                this.addDoctorDetailsForm.reset();
                let navigationExtras: NavigationExtras = {
                  queryParams: {
                    doctorId: data.object.doctorId,
                  }
                };
                this.router.navigate(["/home/usershome/addUser"], navigationExtras);
              }
            });
          } else {
            alert("Data saved , when file is option");
            alert('please add the login credintials to this user')
            this.addDoctorDetailsForm.reset();
            let navigationExtras: NavigationExtras = {
              queryParams: {
                doctorId: data.object.doctorId,
              }
            };
            this.router.navigate(["/home/usershome/addUser"], navigationExtras);
          }
        } else {
          alert("Data unsaved");
        }
      });
    } else {
      this.appComponent.stopSpinner();
      alert("Please, fill the proper details.");
    }
  }

  gotoBack() {
  }

}
