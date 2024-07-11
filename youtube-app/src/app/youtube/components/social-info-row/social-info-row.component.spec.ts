import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialInfoRowComponent } from './social-info-row.component';

describe('SocialInfoRowComponent', () => {
  let component: SocialInfoRowComponent;
  let fixture: ComponentFixture<SocialInfoRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocialInfoRowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialInfoRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
