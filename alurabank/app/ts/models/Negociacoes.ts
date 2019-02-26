import {Negociacao} from './Negociacao';

export class Negociacoes {

  private _negociacoes: Negociacao[] = [];

  adiciona(negociacao: Negociacao): void {
    this._negociacoes.push(negociacao);
  }

  paraArray(): Negociacao[] {
    // Por causa do strictNullChecks
    return ([] as Negociacao[]).concat(this._negociacoes);
  }
}