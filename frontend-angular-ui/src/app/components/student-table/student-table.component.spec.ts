import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule, Routes } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { DebugElement } from '@angular/core';
import { StudentTableComponent } from './student-table.component';

describe('StudentTableComponent', () => {
  let component: StudentTableComponent;
  let fixture: ComponentFixture<StudentTableComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentTableComponent],
      imports: [BrowserModule, FormsModule, ReactiveFormsModule],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(StudentTableComponent);

        component = fixture.componentInstance;
        fixture.detectChanges();
        de = fixture.debugElement.query(By.css('form'));
        el = de.nativeElement;
      });
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should be submitted to true`, async () => {
    component.submitForm();
    expect(component.submitForm).toBeTruthy();
  });
  it(`should call onSubmit method`, async () => {
    fixture.detectChanges();
    spyOn(component, 'submitForm');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.submitForm).toHaveBeenCalledTimes(1);
  });

  it(`form should be invalid`, async(() => {
    component.form.controls['name'].setValue('');
    component.form.controls['email'].setValue('');
    component.form.controls['dateofbirth'].setValue('');
    expect(component.form.valid).toBeFalse();
  }));
  it(`form should be valid`, async(() => {
    component.form.controls['name'].setValue('sudharshan');
    component.form.controls['email'].setValue('sudharshanreddykr@gmail.com');
    component.form.controls['dateofbirth'].setValue('1997/12/26');
    expect(component.form.valid).toBeTruthy();
  }));

  it('should test input validity', () => {
    const nameInput = component.form.controls.name;
    // const addressInput = component.form.controls.address;

    expect(nameInput.valid).toBeFalsy();
    // expect(addressInput.valid).toBeTruthy();

    nameInput.setValue('John Peter');
    expect(nameInput.valid).toBeTruthy();
  });
});
