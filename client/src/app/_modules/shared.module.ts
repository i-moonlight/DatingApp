import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { HomeComponent } from '../home/home.component';
import { NavComponent } from '../nav/nav.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterOutlet } from '@angular/router';



@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
      RouterOutlet, 
      NgbModule, 
      NavComponent, 
      HomeComponent, 
      ToastrModule
  ],
  exports:[
    CommonModule, 
      RouterOutlet, 
      NgbModule, 
      NavComponent, 
      HomeComponent, 
      ToastrModule
  ]
})
export class SharedModule { }
