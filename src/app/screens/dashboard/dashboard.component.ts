import { Component, OnInit } from '@angular/core';
import { Poem } from '@models/poem.model';
import { DashboardService } from '@services/dashboard.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  poems$: Observable<Poem[]>;
  selectedPoem$: Observable<Poem | undefined>;
  loading$: Observable<boolean>;
  loadingStep$: Observable<string | undefined>;
  selectedPoemId$: Observable<number | undefined>;

  constructor(private dashboardService: DashboardService) {}

  async ngOnInit(): Promise<void> {
    this.poems$ = this.dashboardService.poems$;
    this.selectedPoem$ = this.dashboardService.selectedPoem$;
    this.loading$ = this.dashboardService.loading$;
    this.loadingStep$ = this.dashboardService.loadingStep$;
    this.selectedPoemId$ = this.dashboardService.selectedPoemId$;

    await this.dashboardService.fetchRandomPoems();
  }

  selectPoem(poem: Poem): void {
    this.dashboardService.selectedPoem = poem;
  }
}
