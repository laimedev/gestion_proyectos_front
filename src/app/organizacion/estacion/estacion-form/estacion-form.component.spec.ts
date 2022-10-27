import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstacionFormComponent } from './estacion-form.component';

describe('EstacionFormComponent', () => {
  let component: EstacionFormComponent;
  let fixture: ComponentFixture<EstacionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstacionFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstacionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
