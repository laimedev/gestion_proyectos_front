import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoreoKpiComponent } from './monitoreo-kpi.component';

describe('MonitoreoKpiComponent', () => {
  let component: MonitoreoKpiComponent;
  let fixture: ComponentFixture<MonitoreoKpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitoreoKpiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoreoKpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
