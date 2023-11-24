import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbDropdownModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
  providers:[AccountService]
})
export class NavComponent implements OnInit{
  model: any={}
  loggenIn = false;
  ngOnInit(): void { }

  constructor(private accoutnService:AccountService){ }

  login(){
    this.accoutnService.login(this.model).subscribe({
      next: response => {
        console.log(response);
        this.loggenIn = true;
      },
      error: error => console.log(error)
    });
  }
  logout(){
    this.loggenIn =  false;
    
  }

}
