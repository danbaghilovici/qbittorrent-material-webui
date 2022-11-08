import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TorrentChartComponent } from './torrent-chart.component';

describe('TorrentChartComponent', () => {
  let component: TorrentChartComponent;
  let fixture: ComponentFixture<TorrentChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TorrentChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TorrentChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
