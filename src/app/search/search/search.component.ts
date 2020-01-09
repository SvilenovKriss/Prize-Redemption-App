import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) public paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) public sort: MatSort;
  public displayedColumns: string[] = ['Username', 'Email', 'Outlet'];
  public dataSource: any;
  private page: number = 1;

  constructor(private readonly userService: UserService) { }

  public ngOnInit(): void {
    const currentDefaultPage = 0;
    this.userService.getAllUsers(currentDefaultPage + 1).subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public getUsers(currentPage, pageSize, length) {
    const lengthOfUsers = (currentPage + 1) * pageSize;
    if (lengthOfUsers >= length) {
      this.userService.getAllUsers(this.page + 1).subscribe((users: any) => {
        const arrOfUsers = this.dataSource.data;
        arrOfUsers.push(...users);
        this.dataSource.data = arrOfUsers;
        this.page++;
      });
    }
  }
}
