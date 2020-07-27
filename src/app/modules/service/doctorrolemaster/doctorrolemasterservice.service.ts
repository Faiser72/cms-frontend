import { Injectable } from '@angular/core';
import { Api } from 'src/app/api.enum';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DoctorrolemasterserviceService {

  private baseUrl = Api.baseUrl;
  constructor(private http: HttpClient) { }

    // get JobTitle List
    getDoctorRoleMasterList() {
      return this.http.get(`${this.baseUrl}/admin/doctorRoleMaster/doctorRole`);
    }
}
