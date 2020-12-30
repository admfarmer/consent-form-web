import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/shared/alert.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  isCollapsed = true;
  fullname: string;
  constructor(
    private router: Router,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.fullname = sessionStorage.getItem('userFullname');
  }

  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userCid');
    sessionStorage.removeItem('userFullname');
    sessionStorage.removeItem('userHospcode');
    sessionStorage.removeItem('userHospname');
    this.router.navigate(['/login']);
  }

}
