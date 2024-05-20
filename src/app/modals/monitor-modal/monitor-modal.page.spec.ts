import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MonitorModalPage } from './monitor-modal.page';

describe('MonitorModalPage', () => {
  let component: MonitorModalPage;
  let fixture: ComponentFixture<MonitorModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
