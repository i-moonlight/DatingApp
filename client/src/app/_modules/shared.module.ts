import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { HomeComponent } from '../home/home.component';
import { NavComponent } from '../nav/nav.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
      RouterOutlet, 
      NgbModule, 
      NavComponent, 
      HomeComponent, 
      ToastrModule,
      NgxSpinnerModule
  ],
  exports:[
    CommonModule, 
      RouterOutlet, 
      NgbModule, 
      NavComponent, 
      HomeComponent, 
      ToastrModule,
      NgxSpinnerModule
  ],
})
export class SharedModule { }
