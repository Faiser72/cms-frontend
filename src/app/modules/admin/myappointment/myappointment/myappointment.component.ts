import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatSnackBar, MatTableDataSource } from '@angular/material';
import { Router, NavigationExtras } from '@angular/router';
import { AppointmentService } from 'src/app/modules/service/appointment/appointment.service';
import { AuthenticationService } from 'src/app/modules/service/authentication/authentication.service';
import { UsersService } from 'src/app/modules/service/users/users.service';

@Component({
  selector: 'app-myappointment',
  templateUrl: './myappointment.component.html',
  styleUrls: ['./myappointment.component.scss']
})
export class MyappointmentComponent implements OnInit {


  userDetails: any
  dataSource: any;
  displayedColumns: string[] = [
    "slNo",
    "patientNumber",
    "patientName",
    "phoneNumber",
    "doctorName",
    "appointmentDate",
    "appointmentTime",
    // "action"
  ];

  userId: any;
  doctorId: any;

  appointmentDetailsList: any;

  today: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar, private authenticationService: AuthenticationService,
    private appointmentService: AppointmentService,
    private userService: UsersService) {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    this.today = dd + '/' + mm + '/' + yyyy;
    console.log(this.today);
    console.log(this.doctorId, "adv");

  }

  ngOnInit() {
    // this.appointmentService.getAppointmentList().subscribe((data: any) => {
    this.userId = sessionStorage.getItem(this.authenticationService.SESSION_USER_ID_KEY)

    this.userService.getUserDetails(this.userId).subscribe((data: any) => {
      if (data.success) {
        this.userDetails = data.object;
        this.doctorId = this.userDetails.doctor.doctorId;//doctorId from user
      }

      this.appointmentService.getAppointmentDetailsByDoctorId(this.doctorId).subscribe((data: any) => {
        if (data.success) {
          this.appointmentDetailsList = data['listObject'];
          this.dataSource = new MatTableDataSource(data['listObject']);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.customFilter();
        } else {
          this.dataSource = new MatTableDataSource();
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort
        }
      });
    });



  }

  customFilter() {
    this.dataSource.filterPredicate = (data, filter) => {
      const dataStr = data.patientNumber.patientNumber + data.doctorName.doctorName + data.patientName + data.phoneNumber + data.appointmentDate + data.appointmentTime;
      return dataStr.trim().toLowerCase().indexOf(filter) != -1;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  routeToDeleteDoctor(appointmentDetails) {
    if (confirm(`Are you sure to delete this appointment ?`)) {
      let index = this.appointmentDetailsList.findIndex((data: any) => data.appointmentId === appointmentDetails.appointmentId);
      if ((appointmentDetails.appointmentId > 0) && (index > -1)) {
        this.appointmentService.deleteAppointment(appointmentDetails.appointmentId).subscribe((resp: any) => {
          if (resp.success) {
            this.appointmentDetailsList.splice(index, 1);
            this.dataSource = new MatTableDataSource(this.appointmentDetailsList);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.customFilter();
          }
          this._snackBar.open(appointmentDetails.patientName, resp.message, { duration: 2500 });
        });
      }
    }
  }


  routeToEditDoctor(appointmentDetails: any) {
    let navigationExtras: NavigationExtras = {
      queryParams: { appointmentId: appointmentDetails.appointmentId }
    };
    this.router.navigate(["/home/appointmenthome/editappointment"], navigationExtras);
  }


  routeToAddAppointment() {
    this.router.navigate(['/home/appointmenthome/addappointment'])
  }

  routeToPreliminaryCheck() {
    this.router.navigate(['/home/appointmenthome/preliminarycheck'])
  }

  routeToAppointmentDashboard(patient: any, appointment: any) {
    console.log(this.doctorId);
    
    let navigationExtras: NavigationExtras = {
      queryParams: { patient: patient.patientId, appointment: appointment.appointmentId,doctor:this.doctorId },
    };
    this.router.navigate(
      ["/home/appointmentDashboard"],
      navigationExtras
    );
  }
}


