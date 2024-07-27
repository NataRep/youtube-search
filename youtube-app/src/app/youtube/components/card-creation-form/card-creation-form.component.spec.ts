import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCreationFormComponent } from './card-creation-form.component';

describe('CardCreationFormComponent', () => {
  let component: CardCreationFormComponent;
  let fixture: ComponentFixture<CardCreationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardCreationFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardCreationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
