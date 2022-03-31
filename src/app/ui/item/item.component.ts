import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Poem } from '@models/poem.model';
import { DashboardService } from '@services/dashboard.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemComponent implements OnInit {
  @Input() poem: Poem;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {}

  randomColor(): string {
    const hue = Math.floor(Math.random() * 255);
    return 'hsl(' + hue + ', 50%, 50%)';
  }

  async moreFromAuthor(author: string): Promise<void> {
    await this.dashboardService.fetchPoemsForAuthor(author);
  }
}
