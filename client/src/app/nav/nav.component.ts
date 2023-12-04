import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Router, RouterLink } from '@angular/router';
import { IndividualConfig, ToastrModule, ToastrService } from 'ngx-toastr';

// const toastrService = {
//   success: (
//     message?: string,
//     title?: string,
//     override?: Partial<IndividualConfig>
//   ) => {},
//   error: (
//     message?: string,
//     title?: string,
//     override?: Partial<IndividualConfig>
//   ) => {},
// };
class ToasterStub {
  showSuccess(message: string, title: string): void {}
  showError(message: string, title: string): void {}
  showInfo(message: string, title: string): void {}
  showWarning(message: string, title: string): void {}
 }
@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbDropdownModule, RouterLink, ToastrModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit{
  model: any={}
  
  ngOnInit(): void {}

  constructor(public accoutnService:AccountService, 
              private router: Router,
              private toastr: ToastrService){ }

  login(){
    this.accoutnService.login(this.model).subscribe({
      next: _ => this.router.navigateByUrl('/members'),
      error: error => this.toastr.error(error.error, '',{positionClass: 'toast-bottom-right'})
    });
  }
  logout(){
    this.accoutnService.logout();
    this.router.navigateByUrl('/');
  }

}
