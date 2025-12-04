import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Catalog3dComponent } from './catalog3d.component';

describe('Catalog3dComponent', () => {
  let component: Catalog3dComponent;
  let fixture: ComponentFixture<Catalog3dComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Catalog3dComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Catalog3dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
