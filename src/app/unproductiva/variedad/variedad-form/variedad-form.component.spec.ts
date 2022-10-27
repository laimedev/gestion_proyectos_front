import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariedadFormComponent } from './variedad-form.component';

describe('VariedadFormComponent', () => {
  let component: VariedadFormComponent;
  let fixture: ComponentFixture<VariedadFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VariedadFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VariedadFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
