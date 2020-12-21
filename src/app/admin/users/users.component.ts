import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { AlertService } from 'src/app/shared/alert.service'
import { UserService } from 'src/app/shared/user.service';
import { ClrDatagridSortOrder } from '@clr/angular';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  items: any = [];
  info: any = {};

  hospcode: string;
  fullname: string;
  descSort: any;

  userID: any;
  userCid: any;
  userFullname: any;
  userHospcode: any;
  userHospname: any;
  userName: any;
  userPassword: any;
  userStatus: any;

  edit: boolean = false;


  constructor(
    private alertService: AlertService,
    private userService: UserService,
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
        const rs: any = await this.userService.list();
        if (rs.results) {
          this.items = rs.results;
          console.log(this.items);
        } else {
          this.alertService.error('เกิดข้อผิดพลาด');
        }
      } else {
        console.log('Admin รพ.');
        const rs: any = await this.userService.select_hospcode(this.hospcode);
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

  async editUsers(itim: any) {
    console.log(itim);
    this.userID = itim.userID;
    this.userCid = itim.userCid;
    this.userFullname = itim.userFullname;
    this.userHospcode = itim.userHospcode;
    this.userHospname = itim.userHospname;
    this.userName = itim.userName;
    // this.userPassword = itim.userPassword;
    this.userStatus = itim.userStatus;
    this.edit = true;

  }

  async delUsers(itim: any) {
    // console.log(itim);
    this.userID = itim.userID;

    let info = {
      userStatus: 'N'
    }
    try {
      let alert = await this.alertService.confirm('ยื่นยัน ยกการใช้งาน');
      // console.log(alert);
      if (alert) {
        // console.log();
        const rs: any = await this.userService.update(this.userID, info);
        this.gitInfo();
      }
    } catch (error) {
      console.log(error);
      this.alertService.error();
    }
  }

  async Save() {
    let info = {
      userCid: this.userCid,
      userFullname: this.userFullname,
      userHospcode: this.userHospcode,
      userHospname: this.userHospname,
      userName: this.userName,
      userPassword: this.userPassword,
      userStatus: this.userStatus
    }

    if (this.userID) {
      try {
        const rs: any = await this.userService.update(this.userID, info);
        this.edit = false;
        this.gitInfo();
      } catch (error) {
        console.log(error);
        this.edit = false;
        this.alertService.error();
      }
    }
    else {
      try {
        const rs: any = await this.userService.save(info);
        this.edit = false;
        this.gitInfo();
      } catch (error) {
        console.log(error);
        this.edit = false;
        this.alertService.error();
      }
    }
  }

  async Add() {
    this.userID = null;
    this.userCid = null;
    this.userFullname = null;
    this.userHospcode = null;
    this.userHospname = null;
    this.userName = null;
    this.userPassword = null;
    this.userStatus = null;
    this.edit = true;
  }
}
