import { Component, OnInit } from "@angular/core";
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material';

@Component({
  selector: "app-adddoctors",
  templateUrl: "./adddoctors.component.html",
  styleUrls: ["./adddoctors.component.scss"],
})

export class AdddoctorsComponent implements OnInit {

  age:number;

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

  roles = [
    {value: 'consultant-0', viewValue: 'Consultant'},
    {value: 'dutyDoctor-1', viewValue: 'Duty Doctor'},
    {value: 'surgen-2', viewValue: 'Surgen'}
  ];
  constructor() {
    this.placeholder_path = "../../../../assets/Placeholder.jpg";
  }
 

  ngOnInit() {}

  getPhotoFile(photoUpload: HTMLInputElement, event: any) {
    const fileName = event.target.files[0].name;
    this.photoFile = photoUpload.files;

    if (this.photoFile.length === 0) return;

    let mimeType = this.photoFile[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.placeholder_path = "../../../../assets/Placeholder.jpg";
      this.photoMessage = "Only image files are supported.";
      this.candidatePhotoName = "No File Chosen";
      return;
    } else {
      let reader = new FileReader();
      reader.readAsDataURL(this.photoFile[0]);
      reader.onload = (_event) => {
        this.placeholder_path = reader.result as string;
        this.candidatePhotoName = fileName;
      };
      this.photoMessage = null;
      this.ppFile = event.target.files[0];
    }
  }

  ageFromDateOfBirth(dateOfBirth: any): number {
    console.log(dateOfBirth);
    
    if (dateOfBirth != null) {
      const today = new Date();
      const birthDate = new Date(dateOfBirth);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      
      if (isNaN(age)) {
        age = null
      }
      
      // this.addCandidateForm.patchValue({ age: age });
      return (this.age = age);
    }
  }

}
