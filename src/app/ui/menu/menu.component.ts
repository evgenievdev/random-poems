import { Component, OnInit } from '@angular/core';
import { Poem } from '@models/poem.model';
import { DashboardService } from '@services/dashboard.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  selectedPoem$: Observable<Poem | undefined>;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.selectedPoem$ = this.dashboardService.selectedPoem$;
  }

  async refreshPoems(): Promise<void> {
    await this.dashboardService.fetchRandomPoems();
  }

  closePoem(): void {
    this.dashboardService.selectedPoem = undefined;
  }
}
