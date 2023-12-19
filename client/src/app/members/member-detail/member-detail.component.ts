import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Member } from '../../model/member';
import { MembersService } from '../../services/members.service';
import { ActivatedRoute } from '@angular/router';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { GALLERY_CONFIG, GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
@Component({
  selector: 'app-member-detail',
  standalone: true,
  imports: [CommonModule, NgbNavModule, GalleryModule],
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.css'
})
export class MemberDetailComponent implements OnInit {
  member: Member | undefined;
  images: GalleryItem[] = [];
  constructor(private memberService: MembersService,
    private route: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.loadMember();
  }
  loadMember() {
    var username = this.route.snapshot.paramMap.get('username');
    if (!username) return;
    this.memberService.getMember(username).subscribe({
      next: member => {
        this.member = member
        this.getImages();
      }
    });
  }

  getImages(){
    if(!this.member) return;

    for (const photo of this.member.photos){    
      this.images.push(new ImageItem({src: photo.url, thumb: photo.url}));
    }
  }
}
