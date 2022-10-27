import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusyhourListComponent } from './busyhour-list.component';

describe('BusyhourListComponent', () => {
  let component: BusyhourListComponent;
  let fixture: ComponentFixture<BusyhourListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusyhourListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusyhourListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
