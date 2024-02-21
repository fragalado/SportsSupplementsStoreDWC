import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaSuplementoComponent } from './vista-suplemento.component';

describe('VistaSuplementoComponent', () => {
  let component: VistaSuplementoComponent;
  let fixture: ComponentFixture<VistaSuplementoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VistaSuplementoComponent]
    });
    fixture = TestBed.createComponent(VistaSuplementoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
