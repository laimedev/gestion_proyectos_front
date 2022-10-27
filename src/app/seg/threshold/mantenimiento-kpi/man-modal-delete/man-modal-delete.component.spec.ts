import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManModalDeleteComponent } from './man-modal-delete.component';

describe('ManModalDeleteComponent', () => {
  let component: ManModalDeleteComponent;
  let fixture: ComponentFixture<ManModalDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManModalDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManModalDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
