import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Router, RouterLink } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbDropdownModule, RouterLink,ToastrModule],
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
    // debugger;
    this.accoutnService.login(this.model).subscribe({
      next: _ => this.router.navigateByUrl('/members')
    });
  }
  logout(){
    this.accoutnService.logout();
    this.router.navigateByUrl('/');
  }

}
