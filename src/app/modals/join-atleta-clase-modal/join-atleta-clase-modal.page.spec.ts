import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JoinAtletaClaseModalPage } from './join-atleta-clase-modal.page';

describe('JoinAtletaClaseModalPage', () => {
  let component: JoinAtletaClaseModalPage;
  let fixture: ComponentFixture<JoinAtletaClaseModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinAtletaClaseModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
