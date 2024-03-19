import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PromoService } from '../promo.service';
import { AddPromoFormComponent } from '../add-promo-form/add-promo-form.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-promo-detail',
  templateUrl: './promo-detail.component.html',
  styleUrls: ['./promo-detail.component.css']
})
export class PromoDetailComponent implements OnInit {
  promoId: string;
  promo: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private promoService: PromoService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.promoId = params['id'];
      this.getPromoById();
    });
  }

  getPromoById() {
    this.promoService.getPromoById(this.promoId).subscribe(result => {
      this.promo = result.data.GetOnePromo;
      console.log(this.promo)
    }, error => {
      console.error('Error fetching promo:', error);
    });
  }

  openUpdatePromo() {
    const dialogRef = this.dialog.open(AddPromoFormComponent, {
      disableClose: true,
      data: {
        promo: this.promo
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      this.getPromoById();
    });
  }

  deletePromo() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this promo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.promoService.deletePromo(this.promoId).subscribe(
          () => {
            Swal.fire('Deleted!', 'The promo has been deleted.', 'success');
            this.router.navigate(['promo'])
          },
          error => {
            console.error('Error deleting promo:', error);
            Swal.fire('Error!', 'Failed to delete promo.', 'error');
          }
        );
      }
    });
  }

  handleImageError(event: any) {
    event.target.src = 'https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png'
  }

  backToPromo() {
    this.router.navigate(['promo'])
  }
}
