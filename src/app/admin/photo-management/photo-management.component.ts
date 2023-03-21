import { Component } from '@angular/core';
import { Pagination } from 'src/app/_model/pagination';
import { Photo } from 'src/app/_model/photo';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-photo-management',
  templateUrl: './photo-management.component.html',
  styleUrls: ['./photo-management.component.css'],
})
export class PhotoManagementComponent {
  photos: Photo[] | undefined;
  pageNumber = 1;
  pageSize = 5;
  pagination: Pagination | undefined;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.getPhotosForApproval();
  }

  getPhotosForApproval() {
    this.adminService
      .getPhotoForApproval(this.pageNumber, this.pageSize)
      .subscribe({
        next: (response) => {
          (this.photos = response.result),
            (this.pagination = response.pagination);
        },
      });
  }

  pageChanged(event: any) {
    if (this.pageNumber != event.page) {
      this.pageNumber = event.page;
      this.getPhotosForApproval();
    }
  }

  approvePhoto(photoId: string) {
    this.adminService.approvePhoto(photoId).subscribe({
      next: () => {
        this.photos?.splice(
          this.photos.findIndex((x) => x.id === photoId),
          1
        );
      },
    });
  }

  rejectPhoto(photoId: string) {
    this.adminService.rejectPhoto(photoId).subscribe({
      next: () => {
        this.photos?.splice(
          this.photos.findIndex((x) => x.id === photoId),
          1
        );
      },
    });
  }
}
