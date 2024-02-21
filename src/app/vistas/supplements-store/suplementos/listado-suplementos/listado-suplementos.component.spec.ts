import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoSuplementosComponent } from './listado-suplementos.component';

describe('ListadoSuplementosComponent', () => {
  let component: ListadoSuplementosComponent;
  let fixture: ComponentFixture<ListadoSuplementosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListadoSuplementosComponent]
    });
    fixture = TestBed.createComponent(ListadoSuplementosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
