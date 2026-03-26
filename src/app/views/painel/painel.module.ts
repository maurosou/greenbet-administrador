import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PainelRoutingModule } from './painel-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContratoComponent } from './contrato/contrato.component';
import { SaqueComponent } from './saque/saque.component';
import { ExtratoComponent } from './extrato/extrato.component';
import { RedeComponent } from './rede/rede.component';
import { SharedModule } from '../shared/shared.module';
import { RendimentoComponent } from './rendimento/rendimento.component';
import { LogComponent } from './log/log.component';
import { ConfigComponent } from './config/config.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { SegurancaComponent } from './seguranca/seguranca.component';
import { ContaComponent } from './conta/conta.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { VoucherComponent } from './voucher/voucher.component';
import { SocioComponent } from './socio/socio.component';
import { GanhosComponent } from './ganhos/ganhos.component';
import { CriptoComponent } from './cripto/cripto.component';
import { RankingComponent } from './ranking/ranking.component';

@NgModule({
	declarations: [
		DashboardComponent,
		ContratoComponent,
		SaqueComponent,
		ExtratoComponent,
		RedeComponent,
		RendimentoComponent,
		LogComponent,
		ConfigComponent,
		UsuarioComponent,
		SegurancaComponent,
		ContaComponent,
		VoucherComponent,
		SocioComponent,
		GanhosComponent,
		CriptoComponent,
		RankingComponent,
	],
	imports: [
		CommonModule,
		PainelRoutingModule,
		SharedModule,
		MaterialModule,
		FormsModule,
		NgxMaskDirective,
		NgxMaskPipe,
		TablerIconsModule.pick(TablerIcons),
		NgxMaterialTimepickerModule,
	],
})
export class PainelModule { }
