import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { ReportFullComponent } from './report-full/report-full.component';
import { OutletResolverService } from '../crud/services/outlet-resolver.service';
import { CustomerResolverService } from '../crud/services/customer-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: ReportFullComponent,
    canActivate: [AuthGuard],
    resolve: { outlets: OutletResolverService, customers: CustomerResolverService },
    pathMatch: 'full'
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule {}
