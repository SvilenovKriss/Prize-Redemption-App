import { Component, Input, Output, EventEmitter } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  @Input()
  public loggedIn;

  @Output()
  public toggle = new EventEmitter<undefined>();

  @Output()
  public logout = new EventEmitter<undefined>();

  @Output()
  public otherTheme = new EventEmitter<undefined>();

  constructor(public readonly storage: StorageService) { }

  public toggleSidebar() {
    this.toggle.emit();
  }

  public triggerLogout() {
    this.logout.emit();
  }

  public toggleTheme() {
    this.otherTheme.emit();
  }
}
