import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewpatientdiagnosysdetails',
  templateUrl: './viewpatientdiagnosysdetails.component.html',
  styleUrls: ['./viewpatientdiagnosysdetails.component.scss']
})
export class ViewpatientdiagnosysdetailsComponent implements OnInit {

  dataSource: any;
  displayedColumns: string[] = [
    "slNo",
    "drugName",
    "strength",
    "dosage",
    "duration",
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

  backTodiagonosis(){
    this.router.navigate(['patientshome/patienthistoryanddiagnosis'])
  }

}
