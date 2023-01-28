import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoloviComponent } from './stolovi.component';

describe('StoloviComponent', () => {
  let component: StoloviComponent;
  let fixture: ComponentFixture<StoloviComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoloviComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoloviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
