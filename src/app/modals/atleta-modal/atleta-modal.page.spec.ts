import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AtletaModalPage } from './atleta-modal.page';

describe('AtletaModalPage', () => {
  let component: AtletaModalPage;
  let fixture: ComponentFixture<AtletaModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AtletaModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
