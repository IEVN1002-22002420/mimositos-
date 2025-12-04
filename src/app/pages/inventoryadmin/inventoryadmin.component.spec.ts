import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryadminComponent } from './inventoryadmin.component';

describe('InventoryadminComponent', () => {
  let component: InventoryadminComponent;
  let fixture: ComponentFixture<InventoryadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InventoryadminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
