import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from 'src/app/shared/services/app.service';
import { AddPromoFormComponent } from 'src/app/promo-management/add-promo-form/add-promo-form.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit(): void {

  }

}
