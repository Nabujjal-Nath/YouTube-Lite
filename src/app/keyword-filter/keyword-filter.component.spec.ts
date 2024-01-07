import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeywordFilterComponent } from './keyword-filter.component';

describe('KeywordFilterComponent', () => {
  let component: KeywordFilterComponent;
  let fixture: ComponentFixture<KeywordFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KeywordFilterComponent]
    });
    fixture = TestBed.createComponent(KeywordFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
