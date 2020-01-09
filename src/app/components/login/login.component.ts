import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { NotificatorService } from 'src/app/core/services/notificator/notificator.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private readonly auth: AuthService,
    private readonly notificator: NotificatorService,
    private readonly routed: Router
  ) { }

  public triggerLogin(email: string, password: string) {
    this.auth.login(email, password).subscribe(
      (result: any) => {
        this.notificator.success('Logged successfully!');
        this.routed.navigate(['home']);
      },
      ((error) => this.notificator.error(error.error.message))
    );
  }

}
