import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VpnRequestComponent } from './vpn-request.component';

describe('VpnRequestComponent', () => {
  let component: VpnRequestComponent;
  let fixture: ComponentFixture<VpnRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VpnRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VpnRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
