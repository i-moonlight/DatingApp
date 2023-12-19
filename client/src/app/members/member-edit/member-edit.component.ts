import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
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
export class MemberEditComponent implements OnInit, AfterContentChecked {
  @ViewChild('editForm') editForm: NgForm | undefined

  member: Member | undefined;
  user: User | null = null;
  images: GalleryItem[] = [];

  constructor(private accountService: AccountService,
    private memberService: MembersService,
    private toastr: ToastrService,
    private changeDetector: ChangeDetectorRef, 
    // private spinner: NgxSpinnerService
    ) {

  }
  ngOnInit(): void {
    // this.spinner.show(undefined, {
    //   type: 'line-scale-party',
    //   bdColor: 'rgba(255,255,255,0)',
    //   color: '#333333'
    // })

    // setTimeout(() => {
    //   /** spinner ends after 5 seconds */
    //   this.spinner.hide();
    // }, 1000);
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => this.user = user
    });
    this.loadMember();
  }
  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }
  loadMember() {
    if (!this.user) return;

    this.memberService.getMember(this.user.username).subscribe({
      next: member => {
        this.member = member;
        //this.loadImages();
      }
    });
  }

  loadImages() {
    if (!this.member) return;

    for (let img of this.member.photos) {
      this.images.push(new ImageItem({ src: img.url, thumb: img.url }));
    }
  }

  updateMember() {
    this.memberService.updateMember(this.editForm?.value).subscribe({
      next: _ => {
        this.toastr.success("Profile updated successfully");
        this.editForm?.reset(this.member);
      }
    });
  }
}
