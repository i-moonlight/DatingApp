import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavComponent } from "./nav/nav.component";
import { AccountService } from './services/account.service';
import { User } from './model/User';
import { HomeComponent } from "./home/home.component";
import { ToastrModule } from 'ngx-toastr';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, NgbModule, NavComponent, HomeComponent, ToastrModule]
})
export class AppComponent implements OnInit {
  title = 'Dating App';
  users: any;

  constructor(private accountService: AccountService) {

  }
  ngOnInit(): void {
    this.setCurrentUser();
  }


  setCurrentUser(){
    const userString = localStorage.getItem('user');
    if(!userString){
      return;
    }
    const user: User = JSON.parse(userString);
    this.accountService.setCurrentUser(user);
  }

}