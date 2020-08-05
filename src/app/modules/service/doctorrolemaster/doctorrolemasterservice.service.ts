import { Injectable } from '@angular/core';
import { Api } from 'src/app/api.enum';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DoctorrolemasterserviceService {

  private baseUrl = Api.baseUrl;
  constructor(private http: HttpClient) { }

  // get DoctorRole List
  getDoctorRoleMasterList() {
    return this.http.get(`${this.baseUrl}/admin/doctorRoleMaster/doctorRole`);
  }

  //Save DoctorROleMaster
  saveDoctorRoleMasterDetails(doctorRoleDetails: any) {
    return this.http.post(`${this.baseUrl}/admin/doctorRoleMaster/saveDoctorRoleDetails`, doctorRoleDetails);
  }

  // delete DoctorROleMaster
  deleteDoctorRoleMasterDetails(doctorRoleId: any) {
    return this.http.put(`${this.baseUrl}/admin/doctorRoleMaster/deleteDoctorRoleDetails`, null, { params: { doctorRoleId: doctorRoleId } });
  }

  // update DoctorROleMaster
  updateDoctorRoleMasterDetails(doctorRoleDetails: any) {
    return this.http.put(`${this.baseUrl}/admin/doctorRoleMaster/updateDoctorRoleDetails`, doctorRoleDetails);
  }

  // get list of data except this id for validate unique in (edit)
  getDoctorRoleMasterListExceptOne(doctorRoleId: number) {
    return this.http.get(`${this.baseUrl}/admin/doctorRoleMaster/getDoctorRoleListExceptOne/${doctorRoleId}`);
  }

}
