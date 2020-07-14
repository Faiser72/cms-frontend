import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-labtest',
  templateUrl: './labtest.component.html',
  styleUrls: ['./labtest.component.scss']
})
export class LabtestComponent implements OnInit {

  patientNumber;
  patientName;
  date;


  // checkbox starts
  completeheamogram = false;
  bloodGrouprhtype = false;
  postPrandialBloodSugar = false;
  bloodUrea = false;
  bloodUreaNitrogen = false;
  serumCreatinine = false;
  uricAcid = false;
  lipidProfile = false;
  liverFunctionTest = false;
  tsh = false;
  serumCalcium = false;
  hivElisa = false;
  hbsagElisa = false;
  urineRoutine = false;
  chestXRay = false;
  Echocardiogram = false;
  treadmillTest = false;
  ultraSoundAbdomenAndPelvis = false;
  urineCompleteAnalysis = false;
  ecg = false;
  esr = false;
  asloQuantitative = false;
  raQuantitative = false;
  crpQuantitative = false;
  anaElisa = false;
  lh = false;
  prolactin = false;
  fshLHRatio = false;

  constructor() { }

  ngOnInit() {
  }

}
