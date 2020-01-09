import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from 'src/app/modules/scan-code/confirm-dialog/confirm-dialog.component';
import { IRedemptionRecord } from 'src/app/common/interfaces/redemption-record';
import { RedemptionHistoryDialogComponent } from 'src/app/modules/scan-code/redemption-history-dialog/redemption-history-dialog.component';


@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  public openConfirmDialog(message: string) {
    return this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      data: {
        message
      }
    });
  }

  public openDeclinedRedemptionCodeDialog(redemptionRecordsList: IRedemptionRecord[]) {
    return this.dialog.open(RedemptionHistoryDialogComponent, {
      width: '750px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      autoFocus: false,
      maxHeight: '90vh',
      data: {
        redemptionRecordsList
      }
    });
  }
}
