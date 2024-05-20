import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntrenoModalPage } from './entreno-modal.page';

describe('EntrenoModalPage', () => {
  let component: EntrenoModalPage;
  let fixture: ComponentFixture<EntrenoModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrenoModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
