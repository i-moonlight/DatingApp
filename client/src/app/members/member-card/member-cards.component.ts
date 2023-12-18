import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Member } from '../../model/member';

@Component({
  selector: 'app-member-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.css'
})
export class MemberCardsComponent {
 @Input() member:Member | undefined;
}
