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
}
