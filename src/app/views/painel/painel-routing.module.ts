import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PainelLayoutComponent } from 'src/app/layouts/painel-layout/painel-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContratoComponent } from './contrato/contrato.component';
import { SaqueComponent } from './saque/saque.component';
import { ExtratoComponent } from './extrato/extrato.component';
import { RedeComponent } from './rede/rede.component';
import { ContaComponent } from './conta/conta.component';
import { RendimentoComponent } from './rendimento/rendimento.component';
import { ConfigComponent } from './config/config.component';
import { LogComponent } from './log/log.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { SegurancaComponent } from './seguranca/seguranca.component';
import { VoucherComponent } from './voucher/voucher.component';
import { SocioComponent } from './socio/socio.component';
import { GanhosComponent } from './ganhos/ganhos.component';
import { CriptoComponent } from './cripto/cripto.component';
import { RankingComponent } from './ranking/ranking.component';

const routes: Routes = [
	{
		path: '',
		component: PainelLayoutComponent,
		children: [
			{ path: 'dashboard', component: DashboardComponent },
			{ path: 'conta', component: ContaComponent },
			{ path: 'contrato', component: ContratoComponent },
			{ path: 'saque', component: SaqueComponent },
			{ path: 'extrato', component: ExtratoComponent },
			{ path: 'rede', component: RedeComponent },
			{ path: 'rendimento', component: RendimentoComponent },
			{ path: 'config', component: ConfigComponent },
			{ path: 'log', component: LogComponent },
			{ path: 'usuario', component: UsuarioComponent },
			{ path: 'seguranca', component: SegurancaComponent },
			{ path: 'voucher', component: VoucherComponent },
			{ path: 'socio', component: SocioComponent },
			{ path: 'ganho', component: GanhosComponent },
			{ path: 'cripto', component: CriptoComponent },
			{ path: 'ranking', component: RankingComponent },
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class PainelRoutingModule { }
