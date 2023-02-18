import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViolationViewerComponent } from './violation-viewer.component';

describe('ViolationViewerComponent', () => {
  let component: ViolationViewerComponent;
  let fixture: ComponentFixture<ViolationViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViolationViewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViolationViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
