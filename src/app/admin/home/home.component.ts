import { Component, OnInit, Inject, NgZone } from '@angular/core';
import { AlertService } from 'src/app/shared/alert.service'
import { ConsentFormService } from 'src/app/shared/consentform.service';
import { ClrDatagridSortOrder } from '@clr/angular';

import { FileuploadConsentFormService } from 'src/app/shared/fileupload.service'
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
  uploadfile: boolean = false;

  id: any;
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
  file_path: any;

  yourFile: File;


  filePath: string;
  fileName: any;
  files: Array<any> = [];
  isUpoading: boolean = false;

  isupdate: boolean = false;
  open: Boolean = false;
  isUploading = false;
  loadingFiles = false;

  fieldName: any;
  filesToUpload: Array<File>;
  documentCode: any;
  token: any;
  document_id: any;
  file_name: any;


  constructor(
    private alertService: AlertService,
    private consentFormService: ConsentFormService,
    private fileuploadConsentFormService: FileuploadConsentFormService,
    @Inject('DOC_URL') private docUrl: string,

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

    this.id = item.id;
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

  async Save() {
    let info = {
      cid: this.cid,
      hospcode: this.hcode,
      title: this.title,
      fullname: this.name,
      sex: this.sex,
      telephone: this.telephone,
      expiration: moment(this.expiration).tz('Asia/Bangkok').format('YYYY-MM-DD'),
      status: this.status,
      detail: this.detail,
      register: this.register,
      date_reg: this.date_reg
    }

    console.log('ID : ', this.id, '  ', 'info : ', info);

    try {
      const rs: any = await this.consentFormService.update(this.id, info);
      this.gitInfo();
      this.id = null;
      this.cid = null;
      this.hcode = null;
      this.title = null;
      this.name = null;
      this.sex = null;
      this.telephone = null;
      this.expiration = null;
      this.status = null;
      this.detail = null;
      this.register = null;
      this.date_reg = null;

      this.edit = false;


    } catch (error) {
      console.log(error);
      this.alertService.error();
    }
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

  file(i: any) {
    this.cid = i.cid;
    this.filesToUpload = [null];
  }


  // file upload
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = [];
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  async upload(_cid: any) {
    console.log(_cid);


    this.isUploading = true;
    this.documentCode = _cid;
    console.log(this.documentCode);
    console.log(this.filesToUpload);

    try {
      const result: any = await this.fileuploadConsentFormService.makeFileRequest(this.documentCode, this.filesToUpload)
      this.isUploading = false;
      if (result.ok) {
        this.filesToUpload = [];
        this.alertService.success();
        this.gitInfo();
      } else {
        this.alertService.error(JSON.stringify(result.error));
      }

    } catch (error) {
      this.isUploading = false;
      this.alertService.error(JSON.stringify(error));
    }
  }

  async getFilesList(v: any) {
    let _document_id: any;
    let _file_name: any;
    let _no: any;
    this.files = [];
    this.loadingFiles = true;
    let result: any = await this.fileuploadConsentFormService.getFiles(v.cid);
    if (result.rows) {
      _document_id = result.rows.document_id,
        _file_name = result.rows.file_name
    } else {
      _document_id = null;
      _file_name = null;
    }

    let _info = {
      an: v.an,
      fullname: v.fullname,
      ward: v.ward,
      prediag: v.prediag,
      rgtdate: v.rgtdate,
      daycnt: v.daycnt,
      document_id: _document_id,
      file_name: _file_name
    }
    console.log(_info);
    this.items.push(_info);
    this.loadingFiles = false;

  }

  getFile(documentId) {
    const url = `${this.docUrl}/uploads/files/${documentId}`;
    window.open(url, '_blank');
  }

  async removeFile(documentId, idx) {
    this.alertService.confirm('คุณต้องการลบไฟล์นี้ ใช่หรือไม่?')
      .then(() => {
        this.fileuploadConsentFormService.removeFile(documentId)
        this.gitInfo();
      })
      .catch(() => {
        // cancel
      });
  }

}
