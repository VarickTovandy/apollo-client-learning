import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/shared/services/app.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  promos: any[] = [];

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.appService.getAllPromos().subscribe(
      data => {
        this.promos = data.data.GetAllPromos;
      },
      error => {
        console.log('Error:', error);
      }
    )
  }

}
