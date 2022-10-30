import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTrabajoComponent } from './view-trabajo.component';

describe('ViewTrabajoComponent', () => {
  let component: ViewTrabajoComponent;
  let fixture: ComponentFixture<ViewTrabajoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTrabajoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
