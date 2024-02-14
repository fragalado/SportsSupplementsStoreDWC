import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplementsStoreComponent } from './supplements-store.component';

describe('SupplementsStoreComponent', () => {
  let component: SupplementsStoreComponent;
  let fixture: ComponentFixture<SupplementsStoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupplementsStoreComponent]
    });
    fixture = TestBed.createComponent(SupplementsStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
