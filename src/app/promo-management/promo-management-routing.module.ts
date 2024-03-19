import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PromoManagementComponent } from './promo-management.component';
import { PromoDetailComponent } from './promo-detail/promo-detail.component';

const routes: Routes = [
  {
    path: '',
    component: PromoManagementComponent,
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'promo-details/:id',
    component: PromoDetailComponent,
    runGuardsAndResolvers: 'always'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromoManagementRoutingModule { }
