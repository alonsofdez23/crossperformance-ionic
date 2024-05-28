import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminEntrenoPage } from './admin-entreno.page';

describe('AdminEntrenoPage', () => {
  let component: AdminEntrenoPage;
  let fixture: ComponentFixture<AdminEntrenoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEntrenoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
