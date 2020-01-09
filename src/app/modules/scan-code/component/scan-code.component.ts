import { Component, ViewChild, ElementRef } from '@angular/core';
import { NotificatorService } from 'src/app/core/services/notificator/notificator.service';
import { BarcodeFormat } from '@zxing/library';
import { ScanCodeService } from 'src/app/core/services/scan-code/scan-code.service';
import { DialogService } from 'src/app/core/services/dialog/dialog.service';
import { IRedemptionRecord } from 'src/app/common/interfaces/redemption-record';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-scan-code',
  templateUrl: './scan-code.component.html',
  styleUrls: ['./scan-code.component.css']
})
export class ScanCodeComponent {

  @ViewChild('audioOption', { static: true }) public audioPlayerRef: ElementRef;

  public showScanningForPrizeItem = false;
  public codeToAddItemPrizeTo: string;
  public audio = new Audio('assets/audio/beep-06.mp3');
  public redemptionCodeForm: FormGroup;

  public formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.QR_CODE
  ];

  constructor(
    private readonly notificator: NotificatorService,
    private readonly codeScanner: ScanCodeService,
    private readonly confirmDialog: DialogService,
    private readonly formBuilder: FormBuilder
  ) {
    this.redemptionCodeForm = this.formBuilder.group({
      codeField: ['', Validators.required]
    });
  }

  public onCodeResult(resultString: string) {
    this.audio.play();
    this.redemptionCodeForm.controls.codeField.setValue(resultString);
  }

  public submitCode(inputCode: string) {
    if (this.showScanningForPrizeItem) {
      this.submitItemPrizeCode(this.codeToAddItemPrizeTo, inputCode);
    } else {
      this.codeScanner.checkCode(inputCode).subscribe(
        (res: any) => {
          if (res.id) {
            this.confirmDialog.openConfirmDialog('This code is not yet redeemed! Would you like to redeem it?')
              .afterClosed().subscribe((selectedYes) => {
                if (selectedYes === true) {
                  this.redeemCode(inputCode);
                } else {
                  this.cancelRedeemption(inputCode);
                }
              });
          } else {
            this.declineRemeption(inputCode, res);
          }
        },
        (error) => {
          this.notificator.error(error.error.message);
        }
      );
    }
  }

  public submitItemPrizeCode(codeToAddItemPrizeTo: string, itemPrizeCode: string) {
    this.codeScanner.addPrizeItemToCode(codeToAddItemPrizeTo, itemPrizeCode).subscribe(
      () => {
        this.showScanningForPrizeItem = false;
        this.notificator.success('Successfully added prize item!');
      },
      (error) => this.notificator.error(error.message)
    );
  }

  public redeemCode(codeToRedeem: string) {
    this.codeScanner.markCode(codeToRedeem, 'Redeemed').subscribe(
      (response) => {
        this.confirmDialog.openConfirmDialog(
          `You have successfully redeemed a ${(response as any).itemPrizeType} prize! Would you like to add a prize item code as well?`)
          .afterClosed().subscribe((selectedYes) => {
            if (selectedYes === true) {
              this.showScanningForPrizeItem = true;
              this.codeToAddItemPrizeTo = codeToRedeem;
            }
          });
      },
      (error) => this.notificator.error(error.message)
    );
  }

  public cancelRedeemption(codeNotToRedeem: string) {
    this.codeScanner.markCode(codeNotToRedeem, 'Cancelled').subscribe(
      () => {
        this.notificator.success("Redemption record marked as 'Canceled'!");
      },
      (error) => this.notificator.error(error.message)
    );
  }

  public declineRemeption(codeToDecline: string, previousRedemptionAttempts: IRedemptionRecord[]) {
    this.codeScanner.markCode(codeToDecline, 'Declined').subscribe(
      () => {
        this.confirmDialog.openDeclinedRedemptionCodeDialog(previousRedemptionAttempts)
          .afterClosed().subscribe((selectedYes) => {
            if (selectedYes === true) {
              this.codeScanner.reportCode(codeToDecline).subscribe();
            }
          });
      });
  }
}
