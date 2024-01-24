import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaHomeComponent } from './vista-home.component';

describe('VistaHomeComponent', () => {
  let component: VistaHomeComponent;
  let fixture: ComponentFixture<VistaHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VistaHomeComponent]
    });
    fixture = TestBed.createComponent(VistaHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
