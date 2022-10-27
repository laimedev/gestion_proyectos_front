import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUbigeoComponent } from './create-ubigeo.component';

describe('CreateUbigeoComponent', () => {
  let component: CreateUbigeoComponent;
  let fixture: ComponentFixture<CreateUbigeoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUbigeoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUbigeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
