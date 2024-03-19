import { Component, Input, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-promo-card-list',
  templateUrl: './promo-card-list.component.html',
  styleUrls: ['./promo-card-list.component.scss']
})
export class PromoCardListComponent implements OnInit {
  @Input() promo: any;
  
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  openPromoDetail() {
    this.router.navigate(['promo/promo-details', this.promo._id])
  }
}
