import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductorFormComponent } from './productor-form.component';

describe('ProductorFormComponent', () => {
  let component: ProductorFormComponent;
  let fixture: ComponentFixture<ProductorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductorFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
