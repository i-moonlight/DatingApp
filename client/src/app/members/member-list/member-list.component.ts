import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Member } from '../../model/member';
import { MembersService } from '../../services/members.service';
import { MemberCardsComponent } from '../member-card/member-card.component';

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [CommonModule, MemberCardsComponent],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent implements OnInit {
members: Member[] = [];

  constructor(private memberService: MembersService){}
  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(){
    this.memberService.getMembers().subscribe({
      next: members => this.members = members
    })
  }
}
