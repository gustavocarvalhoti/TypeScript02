import {NegociacoesView, MensagemView} from '../views/index';
import {Negociacao, Negociacoes} from '../models/index';
//import {logarTempoDeExecucao} from '../helpers/decorators/index';
import {domInject} from '../helpers/decorators/index';

export class NegociacaoController {

  // Pesquisa no DOM - Carrega tudo no Construtor
  /*
  private _inputData: JQuery;
  private _inputQuantidade: JQuery;
  private _inputValor: JQuery;
  */

  // Carrega só quando vai utilizar
  @domInject('#data')
  private _inputData: JQuery;
  @domInject('#quantidade')
  private _inputQuantidade: JQuery;
  @domInject('#valor')
  private _inputValor: JQuery;


  private _negociacoes = new Negociacoes();
  private _negociacoesView = new NegociacoesView('#negociacoesView', true);
  private _mensagemView = new MensagemView('#mensagemView', true);

  constructor() {
    // Pesquisa no DOM - Carrega tudo no Construtor
    /*
    this._inputData = $('#data');
    this._inputQuantidade = $('#quantidade');
    this._inputValor = $('#valor');
    */

    this._negociacoesView.update(this._negociacoes);
  }

  //@logarTempoDeExecucao(true)
  adiciona(event: Event) {
    event.preventDefault();

    let data = new Date(this._inputData.val().replace(/-/g, ','));

    if (!this._ehDiaUtil(data)) {
      this._mensagemView.update('Não atendemos nos finais de semana!');
      return;
    }

    const negociacao = new Negociacao(
        data,
        parseInt(this._inputQuantidade.val()),
        parseFloat(this._inputValor.val())
    );

    this._negociacoes.adiciona(negociacao);
    this._negociacoesView.update(this._negociacoes);
    this._mensagemView.update('Negociação adicionada com sucesso!');
  }

  importarDados() {
    function isOK(res: Response) {
      if (res.ok) {
        return res;
      } else {
        throw new Error(res.statusText);
      }
    }

    fetch('http://localhost:8080/dados')
    .then(res => isOK(res))
    .then(res => res.json())
    .then((dados: any[]) => {
      dados
      .map(dado => new Negociacao(new Date(), dado.vezes, dado.montante))
      .forEach(negociacao => this._negociacoes.adiciona(negociacao));
      this._negociacoesView.update(this._negociacoes);
    })
    .catch(err => console.log(err.message));
  }

  private _ehDiaUtil(data: Date) {
    // Dia da semana - (0 - Domingo, 6 - Sábado)
    return data.getDay() != DiaDaSemana.SABADO && data.getDay() != DiaDaSemana.DOMINGO;
  }
}

// Por default ele pega 0, 1, 2 ... 6
enum DiaDaSemana {
  DOMINGO,
  SEGUNDA,
  TERCA,
  QUARTA,
  QUINTA,
  SEXTA,
  SABADO
}