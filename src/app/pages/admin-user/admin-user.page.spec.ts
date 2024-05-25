import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminUserPage } from './admin-user.page';

describe('AdminUserPage', () => {
  let component: AdminUserPage;
  let fixture: ComponentFixture<AdminUserPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
