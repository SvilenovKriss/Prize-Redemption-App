import { Component } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(public readonly storage: StorageService) { }
}
