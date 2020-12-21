import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { AlertService } from 'src/app/shared/alert.service'
import { ConsentFormService } from 'src/app/shared/consentform.service';
import { ClrDatagridSortOrder } from '@clr/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  items: any = [];
  info: any = {};

  hospcode: string;
  fullname: string;
  descSort: any;

  constructor(
    private alertService: AlertService,
    private consentFormService: ConsentFormService,

  ) { }

  ngOnInit(): void {
    this.descSort = ClrDatagridSortOrder.DESC;
    this.hospcode = sessionStorage.getItem('userHospcode');
    this.fullname = sessionStorage.getItem('userFullname');
    this.gitInfo();
  }

  async gitInfo() {
    console.log(this.hospcode);
    try {
      if (this.hospcode == '00022') {
        console.log('Admin สสจ.');
        const rs: any = await this.consentFormService.list();
        if (rs.results) {
          this.items = rs.results;
          console.log(this.items);
        } else {
          this.alertService.error('เกิดข้อผิดพลาด');
        }
      } else {
        console.log('Admin รพ.');
        const rs: any = await this.consentFormService.select_hospcode(this.hospcode);
        if (rs.results) {
          this.items = rs.results;
          console.log(this.items);
        } else {
          this.alertService.error('เกิดข้อผิดพลาด');
        }
      }
    } catch (error) {
      console.log(error);
      this.alertService.error();
    }

  }

}
