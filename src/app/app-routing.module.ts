import { NotFoundComponent } from './components/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { HelpDeskComponent } from './components/help-desk/help-desk.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'help-desk', component: HelpDeskComponent },
  { path: 'profile', loadChildren: './profile/profile.module#ProfileModule' },
  { path: 'scan', loadChildren: './modules/scan-code/scan-code.module#ScanCodeModule' },
  { path: 'create', loadChildren: '../app/crud/crud.module#CrudModule' },
  { path: 'report', loadChildren: '../app/report/report.module#ReportModule' },
  { path: 'search', loadChildren: './search/search.module#SearchModule' },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
