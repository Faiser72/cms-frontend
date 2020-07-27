import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Api } from "src/app/api.enum";

@Injectable({
  providedIn: "root",
})

export class DefaultService {

  baseUrl = Api.baseUrl;

  constructor(private httpClient: HttpClient) {

  }

  home() {
    return this.httpClient.get(`${this.baseUrl}/home`);
  }

}
