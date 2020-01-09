import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  public get report$() {
    return this.reportSubject$.asObservable();
  }

  private readonly reportSubject$ = new BehaviorSubject<any | null>({});

  public form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    userPropertyType: new FormControl({value: '', disabled: true}),
    userPropertyValue: new FormControl({value: '', disabled: true}),
    periodCheckbox: new FormControl(''),
    userCheckbox: new FormControl(''),
    customerCheckbox: new FormControl(''),
    outletCheckbox: new FormControl({value: '', disabled: true}),
    outletId: new FormControl({value: '', disabled: true}),
    customerId: new FormControl({value: '', disabled: true}),
    fromDate: new FormControl({value: '', disabled: true}),
    untilDate: new FormControl({value: '', disabled: true}),
    fromTime: new FormControl(''),
    untilTime: new FormControl('')
  }, this.requireCheckboxesToBeCheckedValidator());

  constructor(
    private readonly http: HttpClient
  ) {
    this.form.get('periodCheckbox').valueChanges.subscribe((val) => {
      if (val) {
        this.form.get('fromDate').setValidators(Validators.required);
        this.form.get('fromDate').enable();
      } else {
        this.form.get('fromDate').disable();
        this.form.get('fromDate').setValue('');
      }
    });

    this.form.get('fromDate').valueChanges.subscribe((val) => {
      if (val) {
        this.form.get('untilDate').setValidators(Validators.required);
        this.form.get('untilDate').enable();
        this.form.get('untilDate').setValue('');
      } else {
        this.form.get('untilDate').disable();
        this.form.get('untilDate').setValue('');
      }
    });

    this.form.get('userCheckbox').valueChanges.subscribe((val) => {
      if (val) {
        this.form.get('userPropertyType').setValidators(Validators.required);
        this.form.get('userPropertyType').enable();
      } else {
        this.form.get('userPropertyType').disable();
        this.form.get('userPropertyType').setValue('');
        this.form.get('userPropertyValue').setValue('');
        this.form.get('userPropertyValue').disable();
      }
    });

    this.form.get('userPropertyType').valueChanges.subscribe((val) => {
      if (val) {
        this.form.get('userPropertyValue').setValidators(Validators.required);
        this.form.get('userPropertyValue').enable();
        this.form.get('userPropertyValue').setValue('');
      }
      if (val === 'email') {
        this.form.get('userPropertyValue').setValidators(Validators.email);
      }
    });

    this.form.get('customerCheckbox').valueChanges.subscribe((val) => {
      if (val) {
        this.form.get('customerId').setValidators(Validators.required);
        this.form.get('customerId').enable();
      } else {
        this.form.get('customerId').disable();
        this.form.get('customerId').setValue('');
        this.form.get('outletCheckbox').setValue('');
        this.form.get('outletId').disable();
        this.form.get('outletCheckbox').disable();
      }
    });

    this.form.get('customerId').valueChanges.subscribe((val) => {
      if (val) {
        this.form.get('outletCheckbox').setValue('');
        this.form.get('outletCheckbox').enable();
      } else {
        this.form.get('outletCheckbox').disable();
      }
    });

    this.form.get('outletCheckbox').valueChanges.subscribe((val) => {
      if (val) {
        this.form.get('outletId').setValidators(Validators.required);
        this.form.get('outletId').enable();
      } else {
        this.form.get('outletId').disable();
        this.form.get('outletId').setValue('');
      }
    });
  }

  public initializeFormGroup() {
    this.form.setValue({
      $key: null,
      userPropertyType: '',
      userPropertyValue: '',
      periodCheckbox: '',
      userCheckbox: '',
      customerCheckbox: '',
      outletCheckbox: '',
      fromDate: '',
      untilDate: ''
    });
  }

  public requireCheckboxesToBeCheckedValidator(minRequired = 1): ValidatorFn {
    return function validate(formGroup: FormGroup) {
      let checked = 0;

      Object.keys(formGroup.controls).forEach((key) => {
        const control = formGroup.controls[key];

        if (control.value === true) {
          checked ++;
        }
      });

      if (checked < minRequired) {
        return {
          requireCheckboxesToBeChecked: true
        };
      }

      return null;
    };
  }

  public getReportResults(
    fromDate: string,
    untilDate: string,
    userId: string,
    customerId: string,
    outletId: string): Observable<{}> {

    let params = new HttpParams();
    params = !fromDate ? params : params.append('fromDate', fromDate);
    params = !untilDate ? params : params.append('untilDate', untilDate);
    params = !userId ? params : params.append('userId', userId);
    params = !customerId ? params : params.append('customerId', customerId);
    params = !outletId ? params : params.append('outletId', outletId);
    return this.http.get('http://localhost:3000/report', {params});
  }

  public notifyReportSubject() {
    setTimeout(() => this.reportSubject$.next({}));
  }
}
