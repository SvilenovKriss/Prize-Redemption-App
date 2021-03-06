import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { ChartModule } from 'angular2-chartjs';
import {
  MatToolbarModule,
  MatToolbar,
  MatButtonModule,
  MatButton,
  MatIconModule,
  MatIcon,
  MatSidenavModule,
  MatSidenav,
  MatSidenavContent,
  MatSidenavContainer,
  MatFormFieldModule,
  MatFormField,
  MatInputModule,
  MatInput,
  MatNavList,
  MatListModule,
  MatCardModule,
  MatCard,
  MatCardTitle,
  MatCardHeader,
  MatCardSubtitle,
  MatCardContent,
  MatSelectModule,
  MatDialogModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatGridListModule,
  MatRadioModule,
  MatDatepickerModule,
  MatCheckboxModule,
  MatNativeDateModule,
  MatDividerModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatCardModule,
    MatDialogModule,
    MatTableModule,
    MatTabsModule,
    MatExpansionModule,
    MatSortModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatNativeDateModule,
    ChartModule,
    MatDividerModule
  ],
  exports: [
    MatExpansionModule,
    MatToolbar,
    MatButton,
    MatIcon,
    MatSidenav,
    MatSidenavContent,
    MatSidenavContainer,
    MatFormField,
    MatInput,
    MatNavList,
    MatCard,
    MatCardTitle,
    MatCardHeader,
    MatCardSubtitle,
    MatCardContent,
    MatDialogModule,
    CommonModule,
    NgbModule,
    HttpClientModule,
    MatTableModule,
    MatTabsModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSortModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatNativeDateModule,
    ChartModule,
    MatDividerModule
  ]
})
export class SharedModule { }
