import { Component, OnInit } from '@angular/core';
import { MatRadioChange } from '@angular/material';

@Component({
  selector: 'app-patienthistoryanddiagnosis',
  templateUrl: './patienthistoryanddiagnosis.component.html',
  styleUrls: ['./patienthistoryanddiagnosis.component.scss']
})
export class PatienthistoryanddiagnosisComponent implements OnInit {

  patientNumber;
  patientName;
  date;
  thyroidValue:String="yes";


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

  constructor() {
    this.resumeFileName = "No File Chosen";
    this.thyroidFileName = "No File Chosen";

  }

  ngOnInit() {
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


}