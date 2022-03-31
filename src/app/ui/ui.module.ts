import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from './item/item.component';
import { PreviewComponent } from './preview/preview.component';
import { LoadingComponent } from './loading/loading.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [
    ItemComponent,
    PreviewComponent,
    LoadingComponent,
    MenuComponent,
  ],
  imports: [CommonModule],
  exports: [ItemComponent, PreviewComponent, LoadingComponent, MenuComponent],
})
export class UiModule {}
