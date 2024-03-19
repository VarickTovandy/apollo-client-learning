import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SubSink } from 'subsink';
import { AppService } from 'src/app/shared/services/app.service';
import { AddPromoFormComponent } from 'src/app/promo-management/add-promo-form/add-promo-form.component';

@Component({
  selector: 'app-promo-management',
  templateUrl: './promo-management.component.html',
  styleUrls: ['./promo-management.component.scss']
})
export class PromoManagementComponent implements OnInit, OnDestroy {  
  promos: any[] = [];
  currentPage: number = 0;
  pageSize: number = 2;
  totalPromos: number = 0;
  private subs = new SubSink();

  constructor(
    private appService: AppService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadPromos()
  }

  getMaxPage(): number {
    return Math.ceil(this.totalPromos / this.pageSize) - 1;
  }

  loadPromos(): void {
    this.subs.unsubscribe();

    this.subs.sink = this.appService.getAllPromos(this.currentPage, this.pageSize).subscribe(
      data => {
        this.promos = data.data.GetAllPromos;
        this.totalPromos = data.data.GetAllPromos[0].count_document;
      },
      error => {
        console.log('Error:', error);
      }
    );
  }

  openForm() {
    const dialogRef = this.dialog.open(AddPromoFormComponent, {
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadPromos();
    });
  }


  onPreviousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadPromos();
    }
  }

  onNextPage(): void {
    if (this.currentPage < this.totalPromos) {
      this.currentPage++;
      this.loadPromos();
    }
  }

  onPageSizeChange(value: any): void {
    this.currentPage = 0;
    this.pageSize = parseInt(value, 10)
    this.loadPromos();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
