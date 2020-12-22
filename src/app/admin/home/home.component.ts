import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { AlertService } from 'src/app/shared/alert.service'
import { ConsentFormService } from 'src/app/shared/consentform.service';
import { ClrDatagridSortOrder } from '@clr/angular';
import * as moment from 'moment-timezone';


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

  edit: boolean = false;

  cid: any;
  hcode: any;
  title: any;
  name: any;
  sex: any;
  telephone: any;
  expiration: any;
  status: any;
  detail: any;
  register: any;
  date_reg: any;

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

  async consentEdit(item: any) {
    console.log(item);

    this.cid = item.cid;
    this.hcode = item.hospcode;
    this.title = item.title;
    this.name = item.fullname;
    this.sex = item.sex;
    this.telephone = item.telephone;
    this.expiration = moment(item.expiration).tz('Asia/Bangkok').format('YYYY-MM-DD');
    this.status = item.status;
    this.detail = item.detail;
    this.register = item.register;
    this.date_reg = moment(item.date_reg).tz('Asia/Bangkok').format('YYYY-MM-DD');

    this.edit = true;

  }

  async consentDel(item: any) {
    console.log(item);
    try {
      let alert = await this.alertService.confirm();
      if (alert) {
        const rs: any = await this.consentFormService.remove(item.id);
        this.gitInfo();
      }

    } catch (error) {
      console.log(error);
      this.alertService.error();
    }
  }
  async Save() {

  }
}
