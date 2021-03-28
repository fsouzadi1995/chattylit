import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomingMessageComponent } from './incoming-message.component';

describe('IncomingMessageComponent', () => {
  let component: IncomingMessageComponent;
  let fixture: ComponentFixture<IncomingMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomingMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomingMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
