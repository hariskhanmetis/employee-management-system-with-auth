import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpErrorsComponent } from './http-errors.component';

describe('HttpErrorsComponent', () => {
  let component: HttpErrorsComponent;
  let fixture: ComponentFixture<HttpErrorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HttpErrorsComponent]
    });
    fixture = TestBed.createComponent(HttpErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
