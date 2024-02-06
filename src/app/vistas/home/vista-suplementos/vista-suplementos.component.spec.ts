import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaSuplementosComponent } from './vista-suplementos.component';

describe('VistaSuplementosComponent', () => {
  let component: VistaSuplementosComponent;
  let fixture: ComponentFixture<VistaSuplementosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VistaSuplementosComponent]
    });
    fixture = TestBed.createComponent(VistaSuplementosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
