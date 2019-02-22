export class Negociacao {

  // readonly - Não pode alterar (Apenas get)
  constructor(readonly data: Date, readonly quantidade: number, readonly valor: number) {
  }

  get volume() {
    return this.quantidade * this.valor;
  }
}
