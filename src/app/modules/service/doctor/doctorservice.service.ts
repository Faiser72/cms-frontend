import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api } from 'src/app/api.enum';

@Injectable({
  providedIn: 'root'
})
export class DoctorserviceService {

  private baseUrl = Api.baseUrl;
  constructor(private http: HttpClient) { }

  // add doctors
  saveDoctorDetails(doctorDetails: any) {
    return this.http.post(`${this.baseUrl}/admin/doctor/addDoctor`, doctorDetails);
  }

  saveOrUpdateProfilePhoto(formData: any) {
    return this.http.post(`${this.baseUrl}/admin/doctor/saveOrUpdateDoctorProfilePhoto`, formData);
  }

  // update Doctor Details
  updateDoctorDetails(doctorDetails: any) {
    return this.http.put(`${this.baseUrl}/admin/doctor/updateDoctor`, doctorDetails);
  }

  // get All details
  getDoctorList() {
    return this.http.get(this.baseUrl + '/admin/doctor/getAllDoctorDetails')
  }

  // delete Doctor
  deleteDoctor(doctorId: any) {
    return this.http.put(`${this.baseUrl}/admin/doctor/deleteDoctorDetails`, null, { params: { "doctorId": doctorId } });
  }

  getProfileFile(DoctorId: any): any {
    return this.http.get(`${this.baseUrl}/admin/doctor/getProfileFile`, { params: { "DoctorId": DoctorId } });
  }

  // get DoctorDetails by id
  getDoctorDetails(doctorId: number) {
    return this.http.get(`${this.baseUrl}/admin/doctor/getDoctorDetails/${doctorId}`)
  }
}
