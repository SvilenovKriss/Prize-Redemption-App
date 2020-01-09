import { Component, OnInit, OnDestroy } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IEditUser } from 'src/app/common/interfaces/edit-user';
import { UserService } from 'src/app/core/services/user/user.service';
import { NotificatorService } from 'src/app/core/services/notificator/notificator.service';
import { IActivity } from 'src/app/common/interfaces/activity';
import { IOutlet } from 'src/app/common/interfaces/outlet';
import { IOutletActivity } from 'src/app/common/interfaces/outlet-activity';
import { AppService } from 'src/app/core/services/app/app.service';
import { Subscription } from 'rxjs';
import { DialogService } from 'src/app/core/services/dialog/dialog.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  public currentTheme = 'default';
  public username: string;
  public role: string;
  public createdOn: string;
  public email: string;
  public activity: IActivity[];
  public outletName: string;
  public allOutlets: IOutlet[];
  public id: string;
  public outletActivity: IOutletActivity[];
  public picture: any;

  constructor(
    public storage: StorageService,
    private readonly route: ActivatedRoute,
    private readonly userService: UserService,
    private readonly notificator: NotificatorService,
    private readonly routed: Router,
    private readonly appService: AppService,
    private readonly confirmDialog: DialogService,
    private sanitizer: DomSanitizer
  ) { }

  public ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.activity = data.activity;
      this.username = data.user.username;
      this.createdOn = data.user.createdOn;
      this.email = data.user.email;
      this.outletName = data.user.outletName;
      this.allOutlets = data.outlet;
      this.outletActivity = data.outletActivity;
      this.id = this.route.snapshot.params.id;
      this.role = this.storage.get('role');
      this.getFile(data.user.imageID);
    });
    this.subscription = this.appService.theme$.subscribe(
      (res) => {
        this.currentTheme = res;
      });
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public editUser(user: IEditUser): void {
    this.userService
      .updateUser(user, this.id)
      .subscribe(
        () => {
          // tslint:disable-next-line: strict-boolean-expressions
          if (user.email) {
            this.email = user.email;
          }
          // tslint:disable-next-line: strict-boolean-expressions
          if (user.username) {
            this.username = user.username;
          }
          this.notificator.success('Successfully updated user!');
        },
        (err) => this.notificator.error(err)
      );
  }

  public deleteUser(): void {
    this.confirmDialog.openConfirmDialog('Are you sure you would like to delete this user?')
      .afterClosed().subscribe((selectedYes) => {
        if (selectedYes) {
          this.userService.deleteUser(this.id).subscribe(
            () => {
              this.notificator.success('User is now deleted!');
            },
            (err) => {
              this.notificator.error(err);
            },
            () => this.routed.navigate(['/home'])
          );
        }
      });

  }

  public updateUserOutlet(outletInfo): void {
    this.outletName = outletInfo.nameOfMyOutlet;
    this.userService.updateUserOutlet({ outletId: outletInfo.idOfOutlet }, this.id).subscribe(
      () => {
        this.userService.getUserActivity(this.id).subscribe((data: IActivity[]) => {
          this.activity = data;
        });
        this.userService.getOutletActivity(this.id).subscribe((data: IOutletActivity[]) => {
          this.outletActivity = data;
        });
        this.notificator.success('Successfully changed your outlet!');
      },
      () => this.notificator.error('An error ocurred when tried to change your outlet!')
    );
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

  public changeProfilePic(event) {
    const image = event.target.files;
    this.userService.uploadFile(image[0]).subscribe((imageName: any) => {
      this.getFile(imageName.imageID);
    },
    (err) => this.notificator.error(err));
  }

  public getFile(imageName) {
    this.userService.getFile(imageName).subscribe((imgFile) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        this.picture = this.sanitizer.bypassSecurityTrustResourceUrl(reader.result.toString());
      }, false);

      // tslint:disable-next-line: strict-boolean-expressions
      if (imgFile) {
        reader.readAsDataURL(imgFile);
      }
    },
    () => this.notificator.error('error occurred'));
  }
}