import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listpatienthistory',
  templateUrl: './listpatienthistory.component.html',
  styleUrls: ['./listpatienthistory.component.scss']
})
export class ListpatienthistoryComponent implements OnInit {


  patientNumber;
  patientName;
  doctorName
  date;
  
  isShown: boolean = false; // hidden by default

  dataSource: any;
  displayedColumns: string[] = [
    "slNo",
    "dateVisited",
    "doctorName",
    "diagnosis",
    "prescription",
    "labReports"
    // "action"
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  toggleShow() {

    this.isShown = !this.isShown;

  }


}
