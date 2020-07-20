import { Component, OnInit } from '@angular/core';
import { Prescription } from '../prescriptionmodel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addprescription',
  templateUrl: './addprescription.component.html',
  styleUrls: ['./addprescription.component.scss']
})
export class AddprescriptionComponent implements OnInit {
  patientNumber;
  patientName;
  doctorName
  date;

  dynamicArray: Array<Prescription> = [];
  newDynamic: any = {};

  constructor(private route:Router) { }

  ngOnInit() {
    // for multile contact form starts
    this.newDynamic = {
      drugName: "",
      strength: "",
      morningDosage: "",
      afternoonDosage: "",
      nightDosage: "",
      duration: "",
      remarks:""
    };
    this.dynamicArray.push(this.newDynamic);
    // for multile contact form ends
  }

  savePrescriptionDetails(){

  }
  
  addRow() {
    this.newDynamic = {
      drugName: "",
      strength: "",
      morningDosage: "",
      afternoonDosage: "",
      nightDosage: "",
      duration: "",
      remarks:""
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


  // lab Test

  routeToLabTest(){
    this.route.navigate(['labtest'])
  }

}
