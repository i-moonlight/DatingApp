import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Member } from '../../model/member';
import { User } from '../../model/User';
import { AccountService } from '../../services/account.service';
import { MembersService } from '../../services/members.service';
import { take } from 'rxjs';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { FormsModule, NgForm, } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-member-edit',
  standalone: true,
  imports: [CommonModule, NgbNavModule, GalleryModule, FormsModule],
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.css'
})
export class MemberEditComponent implements OnInit{
  @ViewChild('editForm') editForm: NgForm|undefined
  member: Member | undefined;
  user: User | null = null;
  images: GalleryItem[] = [];
  // editForm: NgForm | null = null;
  constructor(private accountService: AccountService,
              private memberService: MembersService,
              private toastr: ToastrService){
                this.accountService.currentUser$.pipe(take(1)).subscribe({
                  next: user => this.user = user
                });
              }
  ngOnInit(): void {
    this.loadMember();
  }

  // saveForm(form: NgForm){
  //   this.editForm = form;
  // }

  loadMember(){
    if(!this.user) return;

    this.memberService.getMember(this.user.username).subscribe({
      next: member => {
        this.member = member;
        this.loadImages();
      }
    });
  }

  loadImages(){
    if(!this.member) return ;

    for (let img of this.member.photos) {
      this.images.push(new ImageItem({src: img.url, thumb: img.url}));
    }
  }

  updateMember(){
    console.log(this.member);
    this.toastr.success("Profile updated successfully");
    this.editForm?.reset(this.member);
  }
}
