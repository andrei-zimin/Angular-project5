import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolgaComponent } from './volga.component';

describe('VolgaComponent', () => {
  let component: VolgaComponent;
  let fixture: ComponentFixture<VolgaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VolgaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VolgaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
