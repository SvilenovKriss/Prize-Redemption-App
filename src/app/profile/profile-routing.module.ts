import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { ActivityResolverService } from './services/activity-resolver';
import { AuthGuard } from '../auth/auth.guard';
import { UserResolverService } from './services/user-resolver';
import { OutletResolverService } from '../crud/services/outlet-resolver.service';
import { OutletActivityResolverService } from './services/outlet-activity-resolver';

const routes: Routes = [
  {
    path: 'profile/:id',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    resolve: {
      activity: ActivityResolverService,
      user: UserResolverService,
      outlet: OutletResolverService,
      outletActivity: OutletActivityResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
