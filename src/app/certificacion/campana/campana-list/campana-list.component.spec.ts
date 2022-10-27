import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampanaListComponent } from './campana-list.component';

describe('CampanaListComponent', () => {
  let component: CampanaListComponent;
  let fixture: ComponentFixture<CampanaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampanaListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampanaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
