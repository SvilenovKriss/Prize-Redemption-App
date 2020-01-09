import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScanCodeComponent } from './scan-code/component/scan-code.component';
import { AuthGuard } from 'src/app/auth/auth.guard';

const routes: Routes = [
  {path: '', component: ScanCodeComponent, canActivate: [AuthGuard], pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScanCodeRoutingModule { }
