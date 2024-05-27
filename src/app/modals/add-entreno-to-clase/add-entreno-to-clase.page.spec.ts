import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEntrenoToClasePage } from './add-entreno-to-clase.page';

describe('AddEntrenoToClasePage', () => {
  let component: AddEntrenoToClasePage;
  let fixture: ComponentFixture<AddEntrenoToClasePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEntrenoToClasePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
