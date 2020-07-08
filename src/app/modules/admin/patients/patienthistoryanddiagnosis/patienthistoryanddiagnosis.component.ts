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
  thyroidValue;


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

 heightUnits = [
  {value: 'feet-0', viewValue: 'Feet'},
  {value: 'inches-1', viewValue: 'Inches'},
  {value: 'centimeters-2', viewValue: 'Centimeters'},
  {value: 'meters-3', viewValue: 'Meters'}

];

weightUnits = [
  {value: 'pounds-0', viewValue: 'Pounds'},
  {value: 'kilogram-1', viewValue: 'Kilogram'},
];

temperatureUnits = [
  {value: 'celsius-0', viewValue: 'Celsius'},
  {value: 'fahrenhite-1', viewValue: 'Fahrenhite'},
  {value: 'kelvin-2', viewValue: 'Kelvin'}
];
  
//  for dropdown ends

constructor() {
  this.resumeFileName = "No File Chosen";
 }

  ngOnInit() {
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

}
