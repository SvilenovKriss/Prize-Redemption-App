import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/core/services/user/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/core/services/app/app.service';

@Component({
  selector: 'app-help-desk',
  templateUrl: './help-desk.component.html',
  styleUrls: ['./help-desk.component.css']
})
export class HelpDeskComponent implements OnInit, OnDestroy {

  public editGroup: FormGroup;
  private subscription: Subscription;
  public currentTheme = 'default';

  constructor(
    private readonly userService: UserService,
    private readonly formBuilder: FormBuilder,
    private readonly appService: AppService
  ) { }

  public ngOnInit() {
    const minLengthOfDescription = 15;
    const maxLengthOfDescription = 10;
    const minLengthOfSubject = 8;
    const maxLengthOfSubject = 25;

    this.editGroup = this.formBuilder.group({
      subject: [
        '',
        [Validators.minLength(minLengthOfSubject), Validators.maxLength(maxLengthOfSubject)]
      ],
      description: [
        '',
        [Validators.minLength(minLengthOfDescription), Validators.maxLength(maxLengthOfDescription)]
      ]
    });
    this.subscription = this.appService.theme$.subscribe(
      (res) => {
        this.currentTheme = res;
      });
  }

  public sendEmail(): void {
    // tslint:disable-next-line: arrow-parens
    this.userService.sendEmailToHelpDesk(this.editGroup.value).subscribe(__ => __);
  }

  public getThemePrimaryClass() {
    if (this.currentTheme === 'default') {
      return { defaultPrimary: true, defaultAccent: false };
    } else {
      return { altPrimary: true, altAccent: false };
    }
  }

  public getThemeAccentClass() {
    if (this.currentTheme === 'default') {
      return { defaultPrimary: false, defaultAccent: true };
    } else {
      return { altPrimary: false, altAccent: true };
    }
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
