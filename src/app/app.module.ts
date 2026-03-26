import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { PainelLayoutComponent } from './layouts/painel-layout/painel-layout.component';
import { NotFoundLayoutComponent } from './layouts/not-found-layout/not-found-layout.component';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './views/shared/shared.module';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

import { CurrencyPipe, DatePipe, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import * as moment from 'moment-timezone';
import { NgApexchartsModule } from 'ng-apexcharts';
import { environment } from 'src/config';

registerLocaleData(localePt);

moment.tz.setDefault('America/Sao_Paulo');

@NgModule({
	declarations: [AppComponent, AuthLayoutComponent, PainelLayoutComponent, NotFoundLayoutComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		MaterialModule,
		HttpClientModule,
		NgScrollbarModule,
		ToastrModule.forRoot({ enableHtml: true }),
		TablerIconsModule.pick(TablerIcons),
		SharedModule,
		NgxMaskDirective,
		NgxMaskPipe,
		NgxMaterialTimepickerModule,
		NgApexchartsModule,
	],
	exports: [TablerIconsModule],
	providers: [
		provideNgxMask(),
		{ provide: MAT_DATE_LOCALE, useValue: environment.linguaPadrao },
		{ provide: LOCALE_ID, useValue: environment.linguaPadrao },
		DatePipe,
		CurrencyPipe,
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
