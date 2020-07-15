import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-printreferalnote',
  templateUrl: './printreferalnote.component.html',
  styleUrls: ['./printreferalnote.component.scss']
})
export class PrintreferalnoteComponent implements OnInit {

  today: any;
  patientName: String;
  age: any;
  date: any;
  doctorName: any;
  remarks: any;

  patientNumber;
  // patientName;
  // doctorName
  // date;

  isShown: boolean = false;

  constructor() { }

  ngOnInit() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    this.today = dd + '-' + mm + '-' + yyyy;
  }


  toggleShow() {

    this.isShown = !this.isShown;

  }

  printReferal(cmpName) {
    let printContents = document.getElementById(cmpName).innerHTML;
    let originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
  }

}
