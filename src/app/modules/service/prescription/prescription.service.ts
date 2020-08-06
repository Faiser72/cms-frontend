import { Injectable } from '@angular/core';
import { Api } from 'src/app/api.enum';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {
  private baseUrl = Api.baseUrl;
  constructor(private http: HttpClient) { }

  // add Prescription
  savePrescriptionDetails(patientDetails: any) {
    console.log(patientDetails,'jdjhdh');
    
    return this.http.post(`${this.baseUrl}/prescription/addPrescription`, patientDetails);
  }

  // update Prescription Details
  updatePrescriptionDetails(patientDetails: any) {
    return this.http.put(`${this.baseUrl}/prescription/updatePrescription`, patientDetails);
  }

  // get All Prescription details
  getPrescriptionList() {
    return this.http.get(this.baseUrl + '/prescription/getAllPrescriptionDetails')
  }

  // delete Prescription
  deletePrescription(prescriptionId: any) {
    return this.http.put(`${this.baseUrl}/prescription/deletePrescriptionDetails`, null, { params: { "prescriptionId": prescriptionId } });
  }


  // get PrescriptionDetails by id
  getPrescriptionDetails(prescriptionId: number) {
    return this.http.get(`${this.baseUrl}/prescription/getPrescriptionDetails/${prescriptionId}`)
  }

  checkSavedAndGetData(appointmentId: any) {
    return this.http.get(`${this.baseUrl}/prescription/checkSavedAndGetData`, { params: { "appointmentId": appointmentId } })
  }
}