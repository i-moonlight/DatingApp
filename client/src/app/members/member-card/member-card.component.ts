import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Member } from '../../model/member';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-member-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.css'
})
export class MemberCardsComponent {
 @Input() member:Member | undefined;
}
