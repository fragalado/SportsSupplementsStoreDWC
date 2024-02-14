import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleSuplementoComponent } from './detalle-suplemento.component';

describe('DetalleSuplementoComponent', () => {
  let component: DetalleSuplementoComponent;
  let fixture: ComponentFixture<DetalleSuplementoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleSuplementoComponent]
    });
    fixture = TestBed.createComponent(DetalleSuplementoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
