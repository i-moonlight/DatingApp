import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../model/User';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbDropdownModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit{
  model: any={}
  //currentUser$: Observable<User | null> = of(null);
  //loggenIn = false;
  ngOnInit(): void {
    //this.currentUser$ = this.accoutnService.currentUser$;
    //this.getCurrentUser();
   }

  constructor(public accoutnService:AccountService){ }

  // getCurrentUser(){
   
  //   this.accoutnService.currentUser$.subscribe({
  //     next: user => this.loggenIn = !!user,
  //     error: error => console.log(error)
  //   })
  // }

  login(){
    this.accoutnService.login(this.model).subscribe({
      next: response => {
        console.log(response);
        //this.loggenIn = true;
      },
      error: error => console.log(error)
    });
  }
  logout(){
    this.accoutnService.logout();
    //this.loggenIn =  false;
    
  }

}
