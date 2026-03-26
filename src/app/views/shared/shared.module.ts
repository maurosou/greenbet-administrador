import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarregandoComponent } from './carregando/carregando.component';
import { PaginacaoComponent } from './paginacao/paginacao.component';
import { MaterialModule } from 'src/app/material.module';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { RouterModule } from '@angular/router';
import { BoxMenuUsuarioComponent } from './box-menu-usuario/box-menu-usuario.component';
import { TituloComponent } from './titulo/titulo.component';
import { ListaVaziaComponent } from './lista-vazia/lista-vazia.component';
import { ModalUsuarioNovoComponent } from './modal-usuario-novo/modal-usuario-novo.component';
import { FormsModule } from '@angular/forms';
import { ModalRendimentoFormComponent } from './modal-rendimento-form/modal-rendimento-form.component';
import { ModalEditarContaComponent } from './modal-editar-conta/modal-editar-conta.component';
import { ModalAlterarPatrocinadorComponent } from './modal-alterar-patrocinador/modal-alterar-patrocinador.component';
import { ModalAlterarSenhaContaComponent } from './modal-alterar-senha-conta/modal-alterar-senha-conta.component';
import { CardTotalAtivoComponent } from './card-total-ativo/card-total-ativo.component';
import { CardTotalInativoComponent } from './card-total-inativo/card-total-inativo.component';
import { CardTotalReceitaComponent } from './card-total-receita/card-total-receita.component';
import { CardTotalUsuarioComponent } from './card-total-usuario/card-total-usuario.component';
import { CardAnualComponent } from './card-anual/card-anual.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ItemArvoreComponent } from './item-arvore/item-arvore.component';
import { ModalVoucherComponent } from './modal-voucher/modal-voucher.component';
import { ModalVoucherRendimentoComponent } from './modal-voucher-rendimento/modal-voucher-rendimento.component';
import { ModalSocioComponent } from './modal-socio/modal-socio.component';
import { ModalAdicionarSaldoComponent } from './modal-adicionar-saldo/modal-adicionar-saldo.component';
import { ModalRemoverSaldoComponent } from './modal-remover-saldo/modal-remover-saldo.component';
import { ModalSaqueSocioComponent } from './modal-saque-socio/modal-saque-socio.component';
import { ModalExcluirAdminComponent } from './modal-excluir-admin/modal-excluir-admin.component';
import { ModalExcluirContratoComponent } from './modal-excluir-contrato/modal-excluir-contrato.component';
import { ModalExcluirSocioComponent } from './modal-excluir-socio/modal-excluir-socio.component';
import { CardSaldoWalletComponent } from './card-saldo-wallet/card-saldo-wallet.component';
import { CardTotalRendimentoComponent } from './card-total-rendimento/card-total-rendimento.component';

const components = [
	CarregandoComponent,
	PaginacaoComponent,
	HeaderComponent,
	SidebarComponent,
	BoxMenuUsuarioComponent,
	TituloComponent,
	ListaVaziaComponent,
	ModalUsuarioNovoComponent,
	ModalRendimentoFormComponent,
	ModalEditarContaComponent,
	ModalAlterarPatrocinadorComponent,
	ModalAlterarSenhaContaComponent,
	CardTotalAtivoComponent,
	CardTotalInativoComponent,
	CardTotalReceitaComponent,
	CardTotalUsuarioComponent,
	CardAnualComponent,
	ItemArvoreComponent,
	ModalVoucherComponent,
	ModalVoucherRendimentoComponent,
	ModalSocioComponent,
	ModalAdicionarSaldoComponent,
	ModalRemoverSaldoComponent,
	ModalSaqueSocioComponent,
	ModalExcluirAdminComponent,
	ModalExcluirContratoComponent,
	ModalExcluirSocioComponent,
	CardSaldoWalletComponent,
	CardTotalRendimentoComponent,
];

@NgModule({
	declarations: components,
	imports: [
		CommonModule,
		MaterialModule,
		TablerIconsModule.pick(TablerIcons),
		NgScrollbarModule,
		RouterModule,
		FormsModule,
		NgApexchartsModule,
	],
	exports: components,
})
export class SharedModule {}
