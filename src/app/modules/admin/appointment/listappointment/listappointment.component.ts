import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-listappointment',
  templateUrl: './listappointment.component.html',
  styleUrls: ['./listappointment.component.scss']
})
export class ListappointmentComponent implements OnInit {
  dataSource: any;
  displayedColumns: string[] = [
    "slNo",
    "patientNumber",
    "patientName",
    "contactNumber",
    "doctorName",
    "appointmentDate",
    "appointmentTime",
    "action"
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

  routeToDeleteDoctor(row) {

  }


  routeToEditDoctor(row) {

  }


  routeToAddAppointment() {
    this.router.navigate(['/appointmenthome/addappointment'])
  }

  routeToPreliminaryCheck(){
    this.router.navigate(['/appointmenthome/preliminarycheck'])
  }
}
