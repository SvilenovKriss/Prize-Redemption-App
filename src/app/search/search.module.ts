import { NgModule } from '@angular/core';
import { SearchComponent } from './search/search.component';
import { SearchRoutingModule } from './search-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [SearchComponent],
  imports: [
    SearchRoutingModule,
    SharedModule
  ]
})

export class SearchModule { }
