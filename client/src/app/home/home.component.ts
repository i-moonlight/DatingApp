import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from "../register/register.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [CommonModule, RegisterComponent]
})
export class HomeComponent {
  registerMode = false;

  registerToggle(){
    this.registerMode = !this.registerMode;
  }

}
