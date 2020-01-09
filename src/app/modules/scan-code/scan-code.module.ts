import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScanCodeComponent } from './component/scan-code.component';
import { ScanCodeRoutingModule } from '../scan-code-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@NgModule({
  declarations: [
    ScanCodeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ScanCodeRoutingModule,
    ZXingScannerModule
  ]
})
export class ScanCodeModule { }
