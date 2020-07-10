import { Component, OnInit } from '@angular/core';
import { MatRadioChange } from '@angular/material';
import { TestReport } from '../testreportmodel';

@Component({
  selector: 'app-preliminarycheck',
  templateUrl: './preliminarycheck.component.html',
  styleUrls: ['./preliminarycheck.component.scss']
})
export class PreliminarycheckComponent implements OnInit {

  patientNumber;
  doctorName;
  date;
  thyroidValue:String;


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
   thyroidFile:FileList;
   thyroidFileName: string;
   thyroidcvFile: string | Blob;
   thyroidMessage: string;



  //  for dropdown starts

  heightUnits = [
    { value: 'feet-0', viewValue: 'Feet' },
    { value: 'inches-1', viewValue: 'Inches' },
    { value: 'centimeters-2', viewValue: 'Centimeters' },
    {value: 'meters-3', viewValue: 'Meters'}

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

  constructor() {
    this.resumeFileName = "No File Chosen";
    this.thyroidFileName = "No File Chosen";

  }

  ngOnInit() {
     // for multile contact form starts
     this.newDynamic = {
      testName: "",
      uploadReport: ""
    };
    this.dynamicArray.push(this.newDynamic);
    // for multile contact form ends
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
      const thyroidName = event.target.files[0].name;
      this.thyroidFile = thyroidUpload.files;
      if (this.thyroidFile.length === 0) return;
  
      let mimeType = this.thyroidFile[0].type;
      if (mimeType.match(/application\/pdf/) == null) {
        this.thyroidMessage = "Only pdf files are supported.";
        this.thyroidFileName = "No File Chosen";
        return;
      } else {
        this.thyroidMessage = null;
        this.thyroidFileName = thyroidName;
        var form_data = new FormData();
        form_data.append("file", event.target.files[0]);
        this.thyroidcvFile = event.target.files[0];
      }
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


}
