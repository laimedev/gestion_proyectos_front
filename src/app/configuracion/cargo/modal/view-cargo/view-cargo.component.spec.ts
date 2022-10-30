import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCargoComponent } from './view-cargo.component';

describe('ViewCargoComponent', () => {
  let component: ViewCargoComponent;
  let fixture: ComponentFixture<ViewCargoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCargoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCargoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
