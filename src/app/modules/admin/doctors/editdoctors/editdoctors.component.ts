import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DoctorrolemasterserviceService } from 'src/app/modules/service/doctorrolemaster/doctorrolemasterservice.service';
import { DoctorserviceService } from 'src/app/modules/service/doctor/doctorservice.service';
import { AppComponent } from 'src/app/app.component';
import { isNullOrUndefined } from 'util';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editdoctors',
  templateUrl: './editdoctors.component.html',
  styleUrls: ['./editdoctors.component.scss']
})
export class EditdoctorsComponent implements OnInit {
  editDoctorDetailsForm: FormGroup;
  phonePattern = "^[0-9_-]{10,12}$";
  doctorId: any;
  doctorList;
  doctors;

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

  constructor(private fb: FormBuilder,
    private doctorRoleMasterService: DoctorrolemasterserviceService,
    private doctorService: DoctorserviceService,
    private appComponent: AppComponent,
    private route: ActivatedRoute,
    // private location:Location
  ) {
    this.placeholder_path = "../../../../assets/Placeholder.jpg";
    this.editDoctorDetailsFormBuilder();
    console.log('roleList', this.doctorRoleList);

    //DoctorRole - Master
    this.doctorRoleMasterService.getDoctorRoleMasterList().subscribe(
      (data: any) => {
        this.doctorRoleList = data.listObject;
        console.log(data.listObject);

      },
      (error) => {
        console.log(error, "Error Caught");
      }
    );
  }


  ngOnInit() {
    this.route.queryParams.subscribe((data) => {
      this.doctorId = data.doctorId;
    });
    this.doctorService.getDoctorDetails(this.doctorId).subscribe((data: any) => {
      this.doctors = data.object;
      let doctorRoleName = this.doctorRoleList.find(
        (jdata: any) =>
          JSON.stringify(jdata) === JSON.stringify(this.doctors.doctorRole)
      ); // To display jobTitle in field
      this.editDoctorDetailsForm.patchValue(this.doctors);
      this.editDoctorDetailsForm.patchValue({
        doctorRole: doctorRoleName,
      });
    });


    this.doctorService.getProfileFile(this.doctorId).subscribe((response: any) => {
      if (response.success) {
        let base64Data = response.byteArray;
        this.placeholder_path = 'data:image/jpeg;base64,' + base64Data;
        this.doctorPhotoName = response.object.profilePicture;
      } else {
        console.log("There is no Profile Photo for this candidate.");
      }
    }, (error: any) => {
      console.log(error);
    });

    // this.setValueForEditForm();
  }


  editDoctorDetailsFormBuilder() {
    this.editDoctorDetailsForm = this.fb.group({
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
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"),
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
      this.editDoctorDetailsForm.patchValue({ age: age });
      return (this.age = age);
    }
  }

  // update company details
  UpdateDoctorDetails() {
    if (this.editDoctorDetailsForm.valid) {
      this.appComponent.startSpinner("Updating data..\xa0\xa0Please wait ...");
      this.doctorService.updateDoctorDetails(this.editDoctorDetailsForm.value).subscribe(
        (resp: any) => {
          if (resp.success) {
            setTimeout(() => {
              alert(resp.message);
              // this._snackBar.open(
              //   this.editJobForm.get("company").value.companyName,
              //   resp.message,
              //   { duration: 3500 }
              // );

              this.appComponent.stopSpinner();
              this.backToJobList();
            }, 1000);
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

  backToJobList() {
    // this.location.back();
  }
}
