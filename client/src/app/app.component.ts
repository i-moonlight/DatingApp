import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavComponent } from "./nav/nav.component";
import { AccountService } from './services/account.service';
import { User } from './model/User';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [HttpClientModule, CommonModule, RouterOutlet, NgbModule, NavComponent],
  providers: [AccountService]
})
export class AppComponent implements OnInit {
  title = 'Dating App';
  users: any;

  constructor(private client: HttpClient,
              private accountService: AccountService
              ) {

  }
  ngOnInit(): void {
    this.getUsers();
    this.setCurrentUser();
  }

  getUsers(){
    this.client.get("https://localhost:5001/api/users").subscribe({
      next: response => this.users = response,
      error: error => console.log(error),
      complete: () => console.log('Request has compleated')
    });
  }

  setCurrentUser(){
    const userString = localStorage.getItem('user');
    if(!userString){
      return;
    }
    const user: User = JSON.parse(userString);
    this.accountService.setCurrentUser(user);
    this.accountService.testValue = 10;
  }

}