import { Component, Input, OnInit } from '@angular/core';
import { Poem } from '@models/poem.model';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
})
export class PreviewComponent implements OnInit {
  @Input() poem: Poem;

  constructor() {}

  ngOnInit(): void {}
}
