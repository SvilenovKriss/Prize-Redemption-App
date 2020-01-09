import { NgModule } from '@angular/core';
import { CreateUserComponent } from './create-user/create-user.component';
import { CreateComponent } from './create/create.component';
import { SharedModule } from '../shared/shared.module';
import { CrudRoutingModule } from './crud-routing.module';
import { CreateOutletComponent } from './create-outlet/create-outlet.component';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { DeleteComponent } from './delete/delete.component';
@NgModule({
  declarations: [CreateUserComponent, CreateComponent, CreateOutletComponent, CreateCustomerComponent, DeleteComponent],
  imports: [
    SharedModule,
    CrudRoutingModule
  ]
})
export class CrudModule { }
