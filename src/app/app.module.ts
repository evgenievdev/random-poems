import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiModule } from '@ui/ui.module';
import { NotFoundComponent } from './screens/not-found/not-found.component';
import { DashboardComponent } from './screens/dashboard/dashboard.component';

@NgModule({
  declarations: [AppComponent, NotFoundComponent, DashboardComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, UiModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
