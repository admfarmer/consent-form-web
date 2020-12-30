import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ClarityModule } from "@clr/angular";
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';


@NgModule({
  declarations: [
    LayoutComponent,
    HomeComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    BrowserModule,
    ClarityModule,
    BrowserAnimationsModule,
    SharedModule,
    FormsModule,
  ]
})

export class AdminModule { }
