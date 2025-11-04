import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MimositosComponent } from './mimositos.component';

describe('MimositosComponent', () => {
  let component: MimositosComponent;
  let fixture: ComponentFixture<MimositosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MimositosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MimositosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
