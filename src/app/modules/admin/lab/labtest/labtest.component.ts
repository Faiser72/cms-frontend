import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-labtest',
  templateUrl: './labtest.component.html',
  styleUrls: ['./labtest.component.scss']
})
export class LabtestComponent implements OnInit {

  patientNumber;
  patientName;
  date;

  constructor() { }

  ngOnInit() {
  }

}
