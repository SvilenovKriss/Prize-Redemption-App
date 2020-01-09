import { NgModule } from '@angular/core';
import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProfileComponent } from './profile/profile.component';
import { ActivityComponent } from './activity/activity.component';
import { EditComponent } from './edit/edit.component';
import { ChangeOutletComponent } from './change-outlet/change-outlet.component';
import { OutletActivityComponent } from './outlet-activity/outlet-activity.component';
@NgModule({
  declarations: [ProfileComponent, ActivityComponent, EditComponent, ChangeOutletComponent, OutletActivityComponent],
  imports: [
    ProfileRoutingModule,
    SharedModule
  ]
})
export class ProfileModule { }
