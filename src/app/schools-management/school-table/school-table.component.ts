import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/shared/services/app.service';

@Component({
  selector: 'app-school-table',
  templateUrl: './school-table.component.html',
  styleUrls: ['./school-table.component.scss']
})
export class SchoolTableComponent implements OnInit {
  schools: any[] = [];
  isLoading: boolean = true;
  pagination = { limit: 10, page: 0 };
  totalItems: number = 0;
  displayedColumns: string[] = ['shortName', 'longName', 'status'];

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.getSchools()
  }

  getSchools(): void {
    this.appService.getSchools(this.pagination).subscribe(
      data => {
        this.schools = data.data.GetAllSchools;
        this.totalItems = data.data.GetAllSchools[0].count_document;
        this.isLoading = false;
      },
      error => {
        console.log('Error:', error);
      }
    )
  }

  onPageChange(event: any): void {
    this.pagination.page = event.pageIndex + 1;
    this.pagination.limit = event.pageSize;
    this.getSchools();
  }
}
