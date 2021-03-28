import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutgoingMessageComponent } from './outgoing-message.component';

describe('OutgoingMessageComponent', () => {
  let component: OutgoingMessageComponent;
  let fixture: ComponentFixture<OutgoingMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutgoingMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutgoingMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
