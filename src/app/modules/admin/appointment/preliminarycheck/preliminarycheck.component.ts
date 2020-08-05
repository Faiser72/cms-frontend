import { Component, OnInit } from '@angular/core';
import { MatRadioChange, MatSnackBar } from '@angular/material';
import { TestReport } from '../testreportmodel';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Location } from '@angular/common';
import { AppComponent } from 'src/app/app.component';
import { PatientService } from 'src/app/modules/service/patient/patient.service';
import { PatientdiagnosisService } from 'src/app/modules/service/patientdiagnosis/patientdiagnosis.service';
import { isNullOrUndefined } from 'util';
import { AppointmentService } from 'src/app/modules/service/appointment/appointment.service';

@Component({
  selector: 'app-preliminarycheck',
  templateUrl: './preliminarycheck.component.html',
  styleUrls: ['./preliminarycheck.component.scss']
})
export class PreliminarycheckComponent implements OnInit {


  addDiagnosisForm: FormGroup;
  appointmentId: any; //from query params
  appointmentDetails: any;
  patientDetails: any;
  patientId: any; //from query params
  patientNumber: any;
  patientName: any;
  age: any;
  date: any;
  thyroidValue: String = "yes";
  diagnosisId:any;

  // fileUploads
  uploadFiles = new FormData();
  photoFile: FileList;
  resumeFile: FileList;
  resumecvFile: string | Blob;
  ppFile: string | Blob;
  placeholder_path: string;
  resumeFileName: string;
  candidatePhotoName: string;
  photoMessage: string;
  resumeMessage: string;

  // thyroid files
  thyroidFile: FileList;
  thyroidFileName: string;
  thyroidcvFile: string | Blob;
  thyroidMessage: string;



  //  for dropdown starts

  heightUnits = [
    { value: 'feet-0', viewValue: 'Feet' },
    { value: 'inches-1', viewValue: 'Inches' },
    { value: 'centimeters-2', viewValue: 'Centimeters' },
    { value: 'meters-3', viewValue: 'Meters' }

  ];

  weightUnits = [
    { value: 'pounds-0', viewValue: 'Pounds' },
    { value: 'kilogram-1', viewValue: 'Kilogram' },
  ];

  temperatureUnits = [
    { value: 'celsius-0', viewValue: 'Celsius' },
    { value: 'fahrenhite-1', viewValue: 'Fahrenhite' },
    { value: 'kelvin-2', viewValue: 'Kelvin' }
  ];

  //  for dropdown ends

  dynamicArray: Array<TestReport> = [];
  newDynamic: any = {};
  checkedDiagnosisDetails: any;


  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    private location: Location,
    private appComponent: AppComponent,
    private patientService: PatientService,
    private patientDiagnosisService: PatientdiagnosisService,
    private appointmentService: AppointmentService
  ) {
    this.resumeFileName = "No File Chosen";
    this.thyroidFileName = "No File Chosen";


  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.patientId = params.patient;
      this.appointmentId = params.appointment;
      console.log(this.appointmentId);
      console.log(this.patientId);

      this.patientDiagnosisService.checkSavedAndGetData(this.appointmentId).subscribe((data: any) => {
        if (data.success) {
          this.checkedDiagnosisDetails = data.object;
          this.diagnosisId=this.checkedDiagnosisDetails.diagnosisId;
          console.log(this.checkedDiagnosisDetails);
          this.addDiagnosisForm.patchValue({
            height: this.checkedDiagnosisDetails.height, heightUnits: this.checkedDiagnosisDetails.heightUnits,
            weight: this.checkedDiagnosisDetails.weight, weightUnits: this.checkedDiagnosisDetails.weightUnits,
            bloodPreasure: this.checkedDiagnosisDetails.bloodPreasure, temperature: this.checkedDiagnosisDetails.temperature,
            temperatureUnits: this.checkedDiagnosisDetails.temperatureUnits, thyroid: this.checkedDiagnosisDetails.thyroid
          })
        } else {
          console.log("Operation failed");
        }
      });
    });



    // for patient details
    this.patientService.getPatientDetails(this.patientId).subscribe((data: any) => {
      this.patientDetails = data.object;
      this.addDiagnosisForm.patchValue({ patient: data.object })

      this.patientName = this.patientDetails.patientName;
      this.patientNumber = this.patientDetails.patientNumber;
      this.age = this.patientDetails.age;
    })

    // for appointment details
    this.appointmentService.getAppointmentDetails(this.appointmentId).subscribe((data: any) => {
      this.appointmentDetails = data.object;
      this.addDiagnosisForm.patchValue({ appointment: data.object })
    })




    // for multile contact form starts
    this.newDynamic = {
      testName: "",
      uploadReport: ""
    };
    this.dynamicArray.push(this.newDynamic);
    // for multile contact form ends

    this.addDiagnosisFormBuilder();
  }

  addDiagnosisFormBuilder() {
    this.addDiagnosisForm = this.fb.group({
      // age: [null, [Validators.required]],
      height: [null, [Validators.required]],
      heightUnits: [null, [Validators.required]],
      weight: [null, [Validators.required]],
      weightUnits: [null, [Validators.required]],
      bloodPreasure: [null, [Validators.required]],
      temperature: [null, [Validators.required]],
      temperatureUnits: [null, [Validators.required]],
      thyroid: [null, [Validators.required]],
      thyroidReports: "",
      patient: "",
      appointment: "",
      diagnosisId:""
    });
  }




  getResumeFile(resumeUpload: HTMLInputElement, event: any) {
    const resumeName = event.target.files[0].name;
    this.resumeFile = resumeUpload.files;
    if (this.resumeFile.length === 0) return;

    let mimeType = this.resumeFile[0].type;
    if (mimeType.match(/application\/pdf/) == null) {
      this.resumeMessage = "Only pdf files are supported.";
      this.resumeFileName = "No File Chosen";
      return;
    } else {
      this.resumeMessage = null;
      this.resumeFileName = resumeName;
      var form_data = new FormData();
      form_data.append("file", event.target.files[0]);
      this.resumecvFile = event.target.files[0];
    }
  }


  thyroid(tradio: MatRadioChange) {
    this.thyroidValue = tradio.value;
  }


  getThyroidFile(thyroidUpload: HTMLInputElement, event: any) {
    this.thyroidFile = thyroidUpload.files;
    if (this.thyroidFile.length === 0)
      return;

    const thyroidName = event.target.files[0].name;

    let mimeType = this.thyroidFile[0].type;
    if (mimeType.match(/application\/pdf/) == null) {
      this.thyroidMessage = "Only pdf files are supported.";
      this.thyroidFileName = "No File Chosen";
      return;
    } else {
      this.thyroidMessage = null;
      this.thyroidFileName = thyroidName;
      // var form_data = new FormData();
      this.thyroidcvFile = event.target.files[0];
      this.saveThyroidFile();
      // form_data.append("file", event.target.files[0]);
      // this.thyroidcvFile = event.target.files[0];
    }
  }


  saveThyroidFile() {
    console.log('id',this.diagnosisId);
    
    this.appComponent.startSpinner("Uploading file..\xa0\xa0Please wait ...");
    const thyroidFormData = new FormData();
    thyroidFormData.append('thyroidFile', this.thyroidcvFile);
    thyroidFormData.append('diagnosisId', this.diagnosisId);
    this.patientDiagnosisService.saveOrUpdateThyroidFiles(thyroidFormData).subscribe((resp: any) => {
      if (resp.success) {
        this.appComponent.stopSpinner();
        if (resp.message == "Already Uploaded") {
          this._snackBar.open("Thyroid File", "Already Uploaded", {
            duration: 2500,
          });
        } else {
          this.appComponent.stopSpinner();
          this._snackBar.open("THyroid File", "Uploaded Successfully", {
            duration: 2500,
          });
        }
      } else {
        this.appComponent.stopSpinner();
        this._snackBar.open("Thyroid File", "Fails to Upload", {
          duration: 2500,
        });
      }
    });
  }



  downloadThyroid() {
    this.patientDiagnosisService.getThyroidFile(this.diagnosisId).subscribe((response: any) => {
      if (response.success) {
        let base64Data = response.byteArray;
        fetch("data:application/pdf;base64," + base64Data)
          .then(function (resp) { return resp.blob() })
          .then(function (blob) {
            var blobURL = URL.createObjectURL(blob);
            window.open(blobURL);
          });
      } else {
        this._snackBar.open("Alert !", "Thyroid File Not Found", { duration: 2500 });
        // console.log("Resume File Not Found");
      }
    }, (error: any) => {
      console.log(error);
    });
  }

  addRow() {
    this.newDynamic = {
      testName: "",
      uploadReport: ""
    };
    this.dynamicArray.push(this.newDynamic);
    // this.toastr.success('New row added successfully', 'New Row');
    return true;
  }

  // contact(): boolean {
  //   let cName: any = [];
  //   let cNo: any = [];
  //   let cEmailId: any = [];
  //   this.dynamicArray.forEach((object, i) => {
  //     cName[i] = object.contactPersonName;
  //     cNo[i] = object.contactPersonNo;
  //     cEmailId[i] = object.contactPersonEmailId;
  //   });

  //   this.addCompanyForm.patchValue({
  //     contactPersonName: cName.join(),
  //     contactPersonNo: cNo.join(),
  //     contactPersonEmailId: cEmailId.join(),
  //   });
  //   return true;
  // }

  deleteRow(index) {
    if (this.dynamicArray.length == 1) {
      // this.toastr.error("Can't delete the row when there is only one row", 'Warning');
      return false;
    } else {
      this.dynamicArray.splice(index, 1);
      // this.toastr.warning('Row deleted successfully', 'Delete row');
      return true;
    }
  }
  // for multile contact form ends (Dynamic Row)

  // saveThyroidFile() {
  //   this.appComponent.startSpinner("Uploading file..\xa0\xa0Please wait ...");
  //   const thyroidFormData = new FormData();
  //   thyroidFormData.append('thyroidFile', this.thyroidcvFile);
  //   thyroidFormData.append('diagnosisId', this.id);
  //   this.patientDiagnosisService.saveOrUpdateThyroidFiles(thyroidFormData).subscribe((resp: any) => {
  //     if (resp.success) {
  //       this.appComponent.stopSpinner();
  //       if (resp.message == "Already Uploaded") {
  //         this._snackBar.open("Thyroid File", "Already Uploaded", {
  //           duration: 2500,
  //         });
  //       } else {
  //         this.appComponent.stopSpinner();
  //         this._snackBar.open("Thyroid File", "Uploaded Successfully", {
  //           duration: 2500,
  //         });
  //       }
  //     } else {
  //       this.appComponent.stopSpinner();
  //       this._snackBar.open("Thyroid File", "Fails to Upload", {
  //         duration: 2500,
  //       });
  //     }
  //   });
  // }

  addDiagnosisFormSubmit() {
    this.addDiagnosisForm.patchValue({diagnosisId:this.diagnosisId});
    if (this.addDiagnosisForm.valid) {
      this.appComponent.startSpinner("Updating data..\xa0\xa0Please wait ...");
      this.patientDiagnosisService.updatePatientDiagnosisDetails(this.addDiagnosisForm.value).subscribe((data: any) => {
        if (data.success) {
          this.appComponent.stopSpinner();
          alert(data.message)
          setTimeout(() => {
            this.gotoBack();
          }, 500);
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
