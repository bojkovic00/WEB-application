import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpstiComponent } from './opsti.component';

describe('OpstiComponent', () => {
  let component: OpstiComponent;
  let fixture: ComponentFixture<OpstiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpstiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpstiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
