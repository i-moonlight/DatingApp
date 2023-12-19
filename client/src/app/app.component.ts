import { Component, OnInit } from '@angular/core';
import { AccountService } from './services/account.service';
import { User } from './model/User';
import { SharedModule } from './_modules/shared.module';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [
      SharedModule
    ]
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