import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegexPassEmailService } from 'src/app/common/services/regex-pass-email.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  @Output()
  public editUser = new EventEmitter();
  public editGroup: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly regexValidator: RegexPassEmailService) {}

  public ngOnInit() {
    const emailMinLength = 5;
    const usernameMinLength = 4;
    const usernameMaxLength = 20;

    this.editGroup = this.formBuilder.group({
      email: [
        '',
        [
          Validators.minLength(emailMinLength),
          Validators.pattern(this.regexValidator.emailValidator)
        ]
      ],
      username: ['', [Validators.minLength(usernameMinLength), Validators.maxLength(usernameMaxLength)]],
      password: ['', [
        Validators.pattern(this.regexValidator.passValidator)
      ]
      ]
    });
  }

  public edit(): void {
    const user = this.editGroup.value;
    const emitUser = {};

    if (user.username !== '') {
      // tslint:disable-next-line: no-string-literal
      emitUser['username'] = user.username;
    }
    if (user.password !== '') {
      // tslint:disable-next-line: no-string-literal
      emitUser['password'] = user.password;
    }
    this.editUser.emit(emitUser);
  }
}
