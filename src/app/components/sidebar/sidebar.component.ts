import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
  @Input()
  public sidenav: MatSidenav;
  public myID: string;
  public role: string;
  public subscription: Subscription;

  constructor(
    private readonly storage: StorageService,
    private readonly authService: AuthService
  ) {}

  public ngOnInit(): void {
    this.subscription = this.authService.user$.subscribe((data) => {
      this.role = this.storage.get('role');
      const id = this.storage.get('id');
      // tslint:disable-next-line: strict-boolean-expressions
      if (id) {
        this.myID = id;
      }
    });
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public showAdminRoutes(): boolean {
    if (this.storage.get('role') === 'Admin') {
      return true;
    } else {
      return false;
    }
  }
}
