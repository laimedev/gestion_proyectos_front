import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoareaFormComponent } from './tipoarea-form.component';

describe('TipoareaFormComponent', () => {
  let component: TipoareaFormComponent;
  let fixture: ComponentFixture<TipoareaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoareaFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoareaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
