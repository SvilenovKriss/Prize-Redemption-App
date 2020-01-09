import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { IActivity } from 'src/app/common/interfaces/activity';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) public paginator: MatPaginator;
  @Input()
  public activity: IActivity[];
  public displayedColumns: string[] = ['Barcode', 'Outlet', 'Time'];
  public dataSource;


  public ngOnInit() {
    this.dataSource = new MatTableDataSource<any>(this.activity);
    this.dataSource.paginator = this.paginator;
  }
}
