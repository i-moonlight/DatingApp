import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-test-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test-error.component.html',
  styleUrl: './test-error.component.css',
})
export class TestErrorComponent {
  baseUrl = 'https://localhost:5001/api/';
  validationErrors: string[] = [];
  constructor(private http:HttpClient){

  }

  get404Error(){
    this.http.get(this.baseUrl + "buggy/not-found").subscribe({
      next: response=>console.log(response),
      error: error => console.log(error)    
    });
  }
  
  get400Error(){
    this.http.get(this.baseUrl + "buggy/bad-request").subscribe({
      next: response=>console.log(response),
      error: error => console.log(error)    
    });
  }
  
  get500Error(){
    this.http.get(this.baseUrl + "buggy/server-error").subscribe({
      next: response=>console.log(response),
      error: error => console.log(error)    
    });
  }
  
  get401Error(){
    this.http.get(this.baseUrl + "buggy/auth").subscribe({
      next: response=>console.log(response),
      error: error => console.log(error)    
    });
  }
  
  get400ValidationError(){
    this.http.post(this.baseUrl + "account/register", {}).subscribe({
      next: response=>console.log(response),
      error: error => {
        console.log(error)
        this.validationErrors = error;
      }    
    });
  }
}
