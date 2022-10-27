import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CivilListComponent } from './civil-list.component';

describe('CivilListComponent', () => {
  let component: CivilListComponent;
  let fixture: ComponentFixture<CivilListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CivilListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CivilListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
