import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCivilComponent } from './create-civil.component';

describe('CreateCivilComponent', () => {
  let component: CreateCivilComponent;
  let fixture: ComponentFixture<CreateCivilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCivilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCivilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
