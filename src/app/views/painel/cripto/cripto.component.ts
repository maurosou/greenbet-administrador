import { Clipboard } from '@angular/cdk/clipboard';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment-timezone';
import { ToastrService } from 'ngx-toastr';
import { ContratoStatusEnum } from 'src/app/enums/contrato-status.enum';
import { TipoPagamentoEnum } from 'src/app/enums/tipo-pagamento.enum';
import { ContratoFiltroAdministradorModel } from 'src/app/models/contrato-filtro-administrador.models';
import { ContratoListaAdministradorModel } from 'src/app/models/contrato-lista-administrador.model';
import { CriptoService } from 'src/app/services/cripto.service';
import { HelperService } from 'src/app/services/helper.service';
import { ModalExcluirContratoComponent } from '../../shared/modal-excluir-contrato/modal-excluir-contrato.component';
import { PaginacaoModel } from 'src/app/models/paginacao.model';

@Component({
  selector: 'app-cripto',
  templateUrl: './cripto.component.html',
  styleUrls: ['./cripto.component.scss']
})
export class CriptoComponent {
  carregando = false;

  status = ContratoStatusEnum;
  tipoPagamento = TipoPagamentoEnum;

  filtro: ContratoFiltroAdministradorModel = {
    dataDe: null,
    dataAte: null,
    status: null,
    tipoPagamento: null,
    conta: null,
    pagina: 1,
  };

  lista: PaginacaoModel<ContratoListaAdministradorModel> = {
    lista: [],
    paginaAtual: 1,
    totalPaginas: 1,
    totalRegistro: 0,
  };

  displayedColumns: string[] = ['id', 'conta', 'status', 'valor', 'quantidadeCripto', 'tipoPagamento', 'data', 'acoes'];

  pendente = 0;
  pago = 0;
  cancelado = 0;
  reinvestido = 0;

  constructor(private criptoService: CriptoService, public dialog: MatDialog, public helper: HelperService, private toast: ToastrService,
    private clipboard: Clipboard,) {
    this.filtro.dataDe = moment().startOf('month').toDate();
    this.filtro.dataAte = moment().toDate();
    this.carregar();
  }

  carregar() {
    this.carregando = true;

    this.pendente = 0;
    this.pago = 0;
    this.cancelado = 0;

    var filtro = Object.assign({}, this.filtro);
    filtro.dataDe = this.helper.ajustarFusoHorario(filtro.dataDe);
    filtro.dataAte = this.helper.ajustarFusoHorario(filtro.dataAte);

    this.criptoService.lista(filtro).subscribe({
      next: (data) => {
        this.lista = data;
        this.carregando = false;
      },
      error: (error) => {
        this.carregando = false;
      },
    });

    this.criptoService.totalStatus(ContratoStatusEnum.Pendente, filtro).subscribe((total) => {
      this.pendente = total;
    });

    this.criptoService.totalStatus(ContratoStatusEnum.Pago, filtro).subscribe((total) => {
      this.pago = total;
    });

    this.criptoService.totalStatus(ContratoStatusEnum.Cancelado, filtro).subscribe((total) => {
      this.cancelado = total;
    });

    this.criptoService.totalReinvestir(filtro).subscribe((total: number) => {
      this.reinvestido = total;
    });
  }

  buscar() {
    this.filtro.pagina = 1;
    this.carregar();
  }

  alterarPagina(pagina: number) {
    this.filtro.pagina = pagina;
    this.carregar();
  }

  alerarStatus(item: ContratoListaAdministradorModel, status: ContratoStatusEnum) {
    item.status = status;
    this.criptoService.status(item.id, status).subscribe();
  }

  aprovar(item: ContratoListaAdministradorModel) {
    item.status = ContratoStatusEnum.Pago;
    this.criptoService.aprovar(item.id).subscribe();
  }

  rejeitar(item: ContratoListaAdministradorModel) {
    item.status = ContratoStatusEnum.Rejeitado;
    this.criptoService.rejeitar(item.id).subscribe();
  }

  copiar(telefone: string) {
    this.clipboard.copy(telefone);
    this.toast.success("Copiado com sucesso");
  }

  abrirWhatsapp(telefone: string) {
    window.open(`https://api.whatsapp.com/send?phone=${this.filtrarNumeros(telefone)}`, '_blank');
  }

  filtrarNumeros(input: string): string {
    return input.replace(/\D/g, '');
  }
}
