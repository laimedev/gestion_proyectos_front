import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateReportAdminComponent } from './create-report-admin.component';

describe('CreateReportAdminComponent', () => {
  let component: CreateReportAdminComponent;
  let fixture: ComponentFixture<CreateReportAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateReportAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateReportAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
