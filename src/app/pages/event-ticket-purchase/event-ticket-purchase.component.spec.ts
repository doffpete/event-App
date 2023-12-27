import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventTicketPurchaseComponent } from './event-ticket-purchase.component';

describe('EventTicketPurchaseComponent', () => {
  let component: EventTicketPurchaseComponent;
  let fixture: ComponentFixture<EventTicketPurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventTicketPurchaseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventTicketPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
