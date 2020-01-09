import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { IOutletActivity } from 'src/app/common/interfaces/outlet-activity';

@Component({
  selector: 'app-outlet-activity',
  templateUrl: './outlet-activity.component.html',
  styleUrls: ['./outlet-activity.component.css']
})
export class OutletActivityComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) public paginator: MatPaginator;
  @Input()
  public outletActivity: IOutletActivity[];
  public displayedColumns: string[] = ['Username', 'Barcode', 'Status', 'Outlet'];
  public dataSource;

  public ngOnInit() {
    this.dataSource = new MatTableDataSource<any>(this.outletActivity);
    this.dataSource.paginator = this.paginator;
  }
}
