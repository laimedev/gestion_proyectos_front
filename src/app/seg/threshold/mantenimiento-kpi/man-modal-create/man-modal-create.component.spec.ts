import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManModalCreateComponent } from './man-modal-create.component';

describe('ManModalCreateComponent', () => {
  let component: ManModalCreateComponent;
  let fixture: ComponentFixture<ManModalCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManModalCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManModalCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
