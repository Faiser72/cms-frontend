import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-referalnote',
  templateUrl: './referalnote.component.html',
  styleUrls: ['./referalnote.component.scss']
})
export class ReferalnoteComponent implements OnInit {

  today: any;
  // patientName: String = "sanjay";
  // age = 90;
  // date = "09-07-2020";
  // doctorName = "sudhakar";

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    this.today = dd + '-' + mm + '-' + yyyy;
  }

  // printReferal() {
  //   console.log('hii bill');
  //   const printContent = document.getElementById("componentID");
  //   const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
  //   WindowPrt.document.write(printContent.innerHTML);
  //   WindowPrt.document.close();
  //   WindowPrt.focus();
  //   WindowPrt.print();
  //   WindowPrt.close();

  // }



  //for popup forgotpassword
  openDialog(patientName, age, date, doctorName, remarks): void {
    var printObj = {
      patientName: patientName,
      age: age,
      date: date,
      doctorName: doctorName,
      remarks:remarks,
      today:this.today
    }
    const dialogRef = this.dialog.open(PrintReferal, {
      width: "800px",
      // height:"300px",
      data: { pageValue: printObj }
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
    });
  }

}





//PopUp of View Rounds
@Component({
  selector: "printreferal",
  templateUrl: "printreferal.html",
  styleUrls: ["./referalnote.component.scss"],
})
export class PrintReferal {

  today: any;
  patientName: String;
  age: any;
  date: any;
  doctorName: any;
  remarks:any;

  printObj;
  constructor(private route: ActivatedRoute,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<PrintReferal>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.printObj = data.pageValue;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
    this.patientName = this.printObj.patientName;
    this.age = this.printObj.age;
    this.date = this.printObj.date;
    this.doctorName = this.printObj.doctorName;
    this.remarks= this.printObj.remarks;
    this.today=this.printObj.today;

  }

  printReferal(cmpName) {
    let printContents = document.getElementById(cmpName).innerHTML;
    let originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
  }


  close() {
    this.dialogRef.close();
  }
}