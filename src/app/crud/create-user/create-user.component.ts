import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IOutlet } from 'src/app/common/interfaces/outlet';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegexPassEmailService } from 'src/app/common/services/regex-pass-email.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  @Output()
  public user = new EventEmitter<any>();
  public editGroup: FormGroup;
  @Input()
  public outlets: IOutlet[];
  @Input()
  public emails;
  @Input()
  public usernames;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly regexValidator: RegexPassEmailService) {}

  public ngOnInit() {
    const emailMinLength = 5;
    const usernameMinLength = 4;
    const usernameMaxLength = 20;
    this.editGroup = this.formBuilder.group({
      email: [
        '', [Validators.minLength(emailMinLength), Validators.pattern(this.regexValidator.emailValidator)]
      ],
      username: ['', [Validators.minLength(usernameMinLength), Validators.maxLength(usernameMaxLength)]],
      password: ['', [Validators.pattern(this.regexValidator.passValidator)]]
    });
    this.usernames = this.usernames.map((arrFromUsernames) => arrFromUsernames.username);
    this.emails = this.emails.map((arrFromEmails) => arrFromEmails.email);
  }

  public createUser(outlet: string) {
    // tslint:disable-next-line: no-string-literal
    this.editGroup.value['outletId'] = outlet;
    this.user.emit(this.editGroup.value);
    this.editGroup.reset();
  }
}
