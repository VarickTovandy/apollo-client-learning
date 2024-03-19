import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PromoManagementRoutingModule } from './promo-management-routing.module';
import { PromoManagementComponent } from './promo-management.component';
import { AddPromoFormComponent } from './add-promo-form/add-promo-form.component';
import { PromoCardListComponent } from './promo-card-list/promo-card-list.component';
import { SharedModule } from '../shared/shared.module';
import { PromoDetailComponent } from './promo-detail/promo-detail.component';


@NgModule({
  declarations: [
    PromoManagementComponent,
    AddPromoFormComponent,
    PromoCardListComponent,
    PromoDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PromoManagementRoutingModule,
  ],
  exports: [
    PromoDetailComponent
  ]
})
export class PromoManagementModule { }
