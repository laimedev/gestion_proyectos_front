import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampanaFormComponent } from './campana-form.component';

describe('CampanaFormComponent', () => {
  let component: CampanaFormComponent;
  let fixture: ComponentFixture<CampanaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampanaFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampanaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
