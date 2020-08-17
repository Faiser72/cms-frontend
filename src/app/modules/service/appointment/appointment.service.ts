import { Injectable } from '@angular/core';
import { Api } from 'src/app/api.enum';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private baseUrl = Api.baseUrl;
  constructor(private http: HttpClient) { }

  // add Appointment
  saveAppointmentDetails(appointmentDetails: any) {
    return this.http.post(`${this.baseUrl}/admin/appointment/addAppointment`, appointmentDetails);
  }

  // update Appointment Details
  updateAppointmentDetails(appointmentDetails: any) {
    return this.http.put(`${this.baseUrl}/admin/appointment/updateAppointment`, appointmentDetails);
  }

  // get All Appointment details
  getAppointmentList() {
    return this.http.get(this.baseUrl + '/admin/appointment/getAllAppointmentDetails')
  }

  // delete Appointment
  deleteAppointment(appointmentId: any) {
    return this.http.put(`${this.baseUrl}/admin/appointment/deleteAppointmentDetails`, null, { params: { "appointmentId": appointmentId } });
  }


  // get AppointmentDetails by id
  getAppointmentDetails(appointmentId: number) {
    return this.http.get(`${this.baseUrl}/admin/appointment/getAppointmentDetails/${appointmentId}`)
  }

  // get AppointmentDetails by  Doctorid
  getAppointmentDetailsByDoctorId(doctorId: number) {
    return this.http.get(`${this.baseUrl}/admin/appointment/getAppointmentDetailsByDoctorId/${doctorId}`)
  }

  // get AppointmentDetails by  Doctorid
  getAppointmentDetailsByDoctorIdAndDate(doctorId: number, today: string) {
    return this.http.get(`${this.baseUrl}/admin/appointment/getAppointmentDetailsByDoctorIdAndDate/${doctorId}/${today}`)
  }

  // to make diagnosed or tested
  testedAppointment(appointmentId: any) {
    return this.http.put(`${this.baseUrl}/admin/appointment/testedAppointment`, null, { params: { "appointmentId": appointmentId } });
  }

  getAllTestedPatientDetailsBtwnDates(fromDate: string, toDate: string) {
    return this.http.get(`${this.baseUrl}/admin/appointment/getAllTestedPatientDetailsBtwnDates/${fromDate}/${toDate}`)
  }

  getAllAppointmentsDetailsBtwnDates(fromDate: string, toDate: string) {
    return this.http.get(`${this.baseUrl}/admin/appointment/getAllAppointmentsDetailsBtwnDates/${fromDate}/${toDate}`)
  }

  getAllAppointmentsDetailsOfDoctorBtwnDates(doctorId: number, fromDate: string, toDate: string) {
    return this.http.get(`${this.baseUrl}/admin/appointment/getAllAppointmentsDetailsOfDoctorBtwnDates/${doctorId}/${fromDate}/${toDate}`)
  }


  // get All Tested Appointment details
  getAllTestedDetailsList() {
    return this.http.get(this.baseUrl + '/admin/appointment/getAllTestedDetails')
  }

  // get AppointmentDetails by  Date
  getAppointmentDetailsByDate(date: string) {
    return this.http.get(`${this.baseUrl}/admin/appointment/getAppointmentDetailsByDate/${date}`)
  }

}
