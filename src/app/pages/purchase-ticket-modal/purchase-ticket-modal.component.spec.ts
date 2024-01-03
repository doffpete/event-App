import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseTicketModalComponent } from './purchase-ticket-modal.component';

describe('PurchaseTicketModalComponent', () => {
  let component: PurchaseTicketModalComponent;
  let fixture: ComponentFixture<PurchaseTicketModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseTicketModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PurchaseTicketModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
