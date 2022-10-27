import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CivilFormComponent } from './civil-form.component';

describe('CivilFormComponent', () => {
  let component: CivilFormComponent;
  let fixture: ComponentFixture<CivilFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CivilFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CivilFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
