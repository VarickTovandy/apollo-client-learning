import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { AppService } from 'src/app/shared/services/app.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {
  users: any[] = [];
  inputControl = new FormControl('');

  isLoading: boolean = true;
  showAlert: boolean = false;
  pagination = { limit: 10, page: 0 };
  totalItems: number = 0;
  displayedColumns: string[] = ['firstName', 'lastName', 'civility'];
  private inputChanged: Subject<string> = new Subject<string>();

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.inputControl.valueChanges.pipe(
      debounceTime(1500)
    ).subscribe((value) => {
      this.getUsers(value)
    });

    this.getUsers();
  }

  getUsers(value?: string): void {
    this.isLoading = true;
    this.appService.getUsers(value, this.pagination).subscribe(
      data => {
        this.users = data.data.GetAllUsers;
        this.totalItems = data.data.GetAllUsers[0].count_document;
        this.isLoading = false;
      },
      error => {
        console.error('Error:', error);
        this.isLoading = false;
      }
    );
  }

  onInputChange(): void {
    this.inputChanged.next();
  }

  onPageChange(event: any): void {
    this.pagination.page = event.pageIndex;
    this.pagination.limit = event.pageSize;
    this.getUsers();
  }
}
