import { Component, OnInit } from '@angular/core';
import { TimelineMax } from 'gsap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  companiesCount: number = 10;
  candidatesCount: number = 20;
  interviewsCount: number = 300;
  jobsCount: number = 40;

  // activeCompaniesCount: number = 9;
  // activeCandidatesCount: number = 17;
  // activeInterviewsCount: number = 250;
  // activeJobsCount: number = 30;
  constructor(private route: Router) {
  }

  routeToDoctors() {
    this.route.navigate(['doctorshome/listdoctor'])
  }

  routeToPatients() {
    this.route.navigate(['patientshome/listpatient'])
  }

  routeToAppointment() {
    this.route.navigate(['appointmenthome/listappointment'])
  }

  routeToReports() {
    this.route.navigate(['reportshome'])
  }
  

  ngOnInit() {
  }

}
