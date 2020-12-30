import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../shared/user.service';
import { ConsentFormService } from '../shared/consentform.service';
import { AlertService } from 'src/app/shared/alert.service'
import { AuthGuardService } from 'src/app/shared/auth-guard.service'
import { LoginService } from 'src/app/shared/login.service'


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
  ],
  providers: [
    AuthGuardService,
    LoginService,
    AlertService,
    UserService,
    ConsentFormService
  ]

})
export class SharedModule { }
