import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource, MatPaginator } from '@angular/material';
import { IRedemptionRecord } from '../../../common/interfaces/redemption-record';

@Component({
  selector: 'app-redemption-history-dialog',
  templateUrl: './redemption-history-dialog.component.html',
  styleUrls: ['./redemption-history-dialog.component.css']
})
export class RedemptionHistoryDialogComponent implements OnInit {

  public columnsToDisplay = ['timeStamp', 'outletName', 'customerName'];
  public records: IRedemptionRecord[] = [];
  public dataSource: MatTableDataSource<IRedemptionRecord>;

  @ViewChild(MatPaginator, {static: false}) public paginator: MatPaginator;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<RedemptionHistoryDialogComponent>) {
      setTimeout(() => this.dataSource.paginator = this.paginator);
    }

    public getRedeemedOrDeclinedClass(status: string) {
      if (status === 'Redeemed') {
        return { redeemedRecord: true };
      } else {
        return { declinedRecord: true };
      }
    }

  public ngOnInit() {
    this.records = this.data.redemptionRecordsList.sort((a, b) => {
      return new Date(a.timeStamp).getTime() - new Date(b.timeStamp).getTime();
    });
    this.dataSource = new MatTableDataSource<IRedemptionRecord>(this.records);
  }

  public closeDialog() {
    this.dialogRef.close(false);
  }
}
