import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompititionComponent } from './compitition.component';

describe('CompititionComponent', () => {
  let component: CompititionComponent;
  let fixture: ComponentFixture<CompititionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompititionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompititionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
