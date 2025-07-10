class Carro {
  public marca: string = "";
  public modelo: string = "";
  public ano: number = 0;
  constructor(marca: string, modelo: string, ano: number) {
    this.marca = marca;
    this.modelo = modelo;
    this.ano = ano;
  }

  public obterDetalhes(): string {
    return `Marca: ${this.marca}, Modelo: ${this.modelo}, Ano: ${this.ano}`
  }
}

const c1 = new Carro("Dodge", "Challenger", 2013);
console.log(c1.obterDetalhes());

class CarroEletrico extends Carro {
  public autonomiaBateria: number = 0;
  constructor(marca: string, modelo: string, ano: number, autonomiaBateria: number) {
    super(marca, modelo, ano);
    this.autonomiaBateria = autonomiaBateria;
  }

  public obterDetalhes(): string {
    return `Marca: ${this.marca}, Modelo: ${this.modelo}, Ano: ${this.ano}, Autonomia da Bateria: ${this.autonomiaBateria}`
  }
}

const c2 = new CarroEletrico("Volkswagen", "Gol", 2008, 200);
console.log(c2.obterDetalhes());