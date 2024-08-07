import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveCustomButtonComponent } from './remove-custom-button.component';

describe('RemoveCustomButtonComponent', () => {
  let component: RemoveCustomButtonComponent;
  let fixture: ComponentFixture<RemoveCustomButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RemoveCustomButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveCustomButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
