import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SibirComponent } from './sibir.component';

describe('SibirComponent', () => {
  let component: SibirComponent;
  let fixture: ComponentFixture<SibirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SibirComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SibirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
