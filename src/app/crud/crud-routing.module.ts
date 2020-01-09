import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { CreateComponent } from './create/create.component';
import { OutletResolverService } from './services/outlet-resolver.service';
import { CustomerResolverService } from './services/customer-resolver.service';
import { UsernameResolverService } from './services/username-resovler.service';
import { EmailResolverService } from './services/email-resovler.service';

const routes: Routes = [
  {
    path: '',
    component: CreateComponent,
    canActivate: [AuthGuard],
    // tslint:disable-next-line: max-line-length
    resolve: { outlets: OutletResolverService, customers: CustomerResolverService, usernames: UsernameResolverService, emails: EmailResolverService },
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrudRoutingModule { }
