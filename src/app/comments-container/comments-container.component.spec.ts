import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsContainerComponent } from './comments-container.component';

describe('CommentsContainerComponent', () => {
  let component: CommentsContainerComponent;
  let fixture: ComponentFixture<CommentsContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommentsContainerComponent]
    });
    fixture = TestBed.createComponent(CommentsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
