let nome: string = "Vitor";
let idade: number = 17;
let ativo: boolean = true;

function calcularIMC(peso: number, altura: number): string {
  let IMC: number = 0;
  if(altura > 3)
    IMC = peso/((altura/100)*(altura/100));
  else
    IMC =  peso/(altura*altura);
  if(IMC < 18.5)
    return `Seu IMC é de ${IMC}, você está abaixo do peso.`
  else if(IMC < 24.9)
    return `Seu IMC é de ${IMC}, você está abaixo do peso ideal.`
  else if(IMC < 29.9)
    return `Seu IMC é de ${IMC}, você está abaixo do sobrepeso.`
  else if(IMC < 39.9)
    return `Seu IMC é de ${IMC}, você está abaixo do obesidade.`
  else 
    return `Seu IMC é de ${IMC}, você está abaixo do obesidade grave.`
}
console.log(calcularIMC(60, 175));
console.log(calcularIMC(100, 1.20));

interface Pessoa {
  nome: string;
  email?: string;
  idade: number;
}

class User implements Pessoa {
  public nome: string = "";
  public email?: string;
  public idade: number = 0;
  constructor(nome: string, idade: number, email?: string) {
    this.nome = nome;
    this.email = email;
    this.idade = idade;
    console.log("Usuário instanciado!")
  }
}

const p1 = new User("Vitor", 17)