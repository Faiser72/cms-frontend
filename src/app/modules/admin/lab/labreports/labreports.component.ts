import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-labreports',
  templateUrl: './labreports.component.html',
  styleUrls: ['./labreports.component.scss']
})
export class LabreportsComponent implements OnInit {

  patientNumber;
  patientrName;
  date;
  
  constructor() { }

  ngOnInit() {
  }

}
