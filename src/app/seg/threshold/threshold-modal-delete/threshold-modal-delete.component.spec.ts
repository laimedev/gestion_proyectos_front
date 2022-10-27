import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThresholdModalDeleteComponent } from './threshold-modal-delete.component';

describe('ThresholdModalDeleteComponent', () => {
  let component: ThresholdModalDeleteComponent;
  let fixture: ComponentFixture<ThresholdModalDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThresholdModalDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThresholdModalDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
