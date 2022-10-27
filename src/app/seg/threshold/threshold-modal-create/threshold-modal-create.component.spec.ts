import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThresholdModalCreateComponent } from './threshold-modal-create.component';

describe('ThresholdModalCreateComponent', () => {
  let component: ThresholdModalCreateComponent;
  let fixture: ComponentFixture<ThresholdModalCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThresholdModalCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThresholdModalCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
