import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent, ForgotPaswordDialog } from './login/login.component';
import { MatIconModule, MatFormFieldModule, MatInputModule, MatDividerModule, MatDialogModule, MatTooltipModule, MatStepperModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [LoginComponent, ForgotPaswordDialog],
  imports: [
    CommonModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatDialogModule,
    MatDividerModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatStepperModule,
    NgxSpinnerModule
  ],
  entryComponents: [ForgotPaswordDialog]
})
export class LoginModule { }
