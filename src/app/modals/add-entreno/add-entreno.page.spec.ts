import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEntrenoPage } from './add-entreno.page';

describe('AddEntrenoPage', () => {
  let component: AddEntrenoPage;
  let fixture: ComponentFixture<AddEntrenoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEntrenoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
