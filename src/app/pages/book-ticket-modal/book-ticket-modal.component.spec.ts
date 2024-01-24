import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookTicketSubModalComponent } from './book-ticket-modal.component';

describe('BookTicketSubModalComponent', () => {
  let component: BookTicketSubModalComponent;
  let fixture: ComponentFixture<BookTicketSubModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookTicketSubModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BookTicketSubModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
