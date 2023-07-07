import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorpcenterComponent } from './corpcenter.component';

describe('CorpcenterComponent', () => {
  let component: CorpcenterComponent;
  let fixture: ComponentFixture<CorpcenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorpcenterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorpcenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
