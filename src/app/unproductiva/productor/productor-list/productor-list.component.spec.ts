import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductorListComponent } from './productor-list.component';

describe('ProductorListComponent', () => {
  let component: ProductorListComponent;
  let fixture: ComponentFixture<ProductorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductorListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
