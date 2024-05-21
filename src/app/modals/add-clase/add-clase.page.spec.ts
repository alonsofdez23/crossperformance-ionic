import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddClasePage } from './add-clase.page';

describe('AddClasePage', () => {
  let component: AddClasePage;
  let fixture: ComponentFixture<AddClasePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddClasePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
