import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaSuplementosComponent } from './lista-suplementos.component';

describe('ListaSuplementosComponent', () => {
  let component: ListaSuplementosComponent;
  let fixture: ComponentFixture<ListaSuplementosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaSuplementosComponent]
    });
    fixture = TestBed.createComponent(ListaSuplementosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
