import { Component, OnInit, ViewChild } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { Router, NavigationExtras } from '@angular/router';
import { MatPaginator, MatSort, MatSnackBar, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-listdoctors',
  templateUrl: './listdoctors.component.html',
  styleUrls: ['./listdoctors.component.scss']
})
export class ListdoctorsComponent implements OnInit {

  dataSource: any;
  displayedColumns: string[] = [
    "slNo",
    "doctorName",
    "specialization",
    "visitingTime",
    "contactNumber",
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

  routeToAddDoctor() {
    this.router.navigate(['/doctorshome/adddoctor'])
  }

}
