// Dados de exemplo para teste do sistema de cobrança BP
export interface Devedor {
  nome: string;
  cpf: string;
  cidade: string;
  estado: string;
  dataNascimento: string;
  nomeMae: string;
  nomePai: string;
  email: string;
  telefone: string;
  dividas: Divida[];
}

export interface Divida {
  id: string;
  credor: string;
  valorOriginal: number;
  valorAtual: number;
  dataVencimento: string;
  tipo: string;
  descontoMaximo: number; // percentual
  jurosAnual: number; // percentual
  status: string;
}

export const devedoresSample: Devedor[] = [
  {
    nome: "Carla Silva Martins",
    cpf: "45678912301",
    cidade: "Porto Alegre",
    estado: "RS", 
    dataNascimento: "15/03/1987",
    nomeMae: "Rosa Silva",
    nomePai: "Antonio Martins",
    email: "carla.martins@outlook.com",
    telefone: "(51) 98765-4321",
    dividas: [
      {
        id: "BP001",
        credor: "Banco Itaú",
        valorOriginal: 4200.00,
        valorAtual: 6300.00,
        dataVencimento: "22/02/2024",
        tipo: "Cartão de Crédito",
        descontoMaximo: 45,
        jurosAnual: 12,
        status: "Em atraso"
      },
      {
        id: "BP002", 
        credor: "Magazine Luiza",
        valorOriginal: 1800.00,
        valorAtual: 2340.00,
        dataVencimento: "10/05/2024",
        tipo: "Compra Parcelada",
        descontoMaximo: 35,
        jurosAnual: 12,
        status: "Em atraso"
      }
    ]
  },
  {
    nome: "Ricardo Santos Oliveira",
    cpf: "78912345602",
    cidade: "São Paulo",
    estado: "SP",
    dataNascimento: "08/11/1982",
    nomeMae: "Lucia Santos",
    nomePai: "Carlos Oliveira",
    email: "ricardo.santos@email.com",
    telefone: "(11) 99876-5432",
    dividas: [
      {
        id: "BP003",
        credor: "Banco Santander",
        valorOriginal: 8500.00,
        valorAtual: 11050.00,
        dataVencimento: "18/01/2024",
        tipo: "Empréstimo Pessoal",
        descontoMaximo: 50,
        jurosAnual: 12,
        status: "Em atraso"
      },
      {
        id: "BP004",
        credor: "Casas Bahia",
        valorOriginal: 2400.00,
        valorAtual: 3120.00,
        dataVencimento: "05/07/2024",
        tipo: "Financiamento",
        descontoMaximo: 40,
        jurosAnual: 12,
        status: "Em atraso"
      }
    ]
  },
  {
    nome: "Fernanda Costa Lima",
    cpf: "12398765403", 
    cidade: "Belo Horizonte",
    estado: "MG",
    dataNascimento: "29/07/1990",
    nomeMae: "Mariana Costa",
    nomePai: "Roberto Lima",
    email: "fernanda.lima@gmail.com",
    telefone: "(31) 97654-3210",
    dividas: [
      {
        id: "BP005",
        credor: "Banco Bradesco",
        valorOriginal: 5800.00,
        valorAtual: 7540.00,
        dataVencimento: "14/04/2024", 
        tipo: "Cheque Especial",
        descontoMaximo: 42,
        jurosAnual: 12,
        status: "Em atraso"
      }
    ]
  },
  {
    nome: "Alessandro Rodrigues Pereira",
    cpf: "65432198704",
    cidade: "Curitiba", 
    estado: "PR",
    dataNascimento: "03/12/1975",
    nomeMae: "Helena Rodrigues",
    nomePai: "José Pereira",
    email: "alessandro.pereira@hotmail.com",
    telefone: "(41) 96543-2109",
    dividas: [
      {
        id: "BP006",
        credor: "Banco do Brasil",
        valorOriginal: 12000.00,
        valorAtual: 15600.00,
        dataVencimento: "28/11/2023",
        tipo: "Financiamento Veículo",
        descontoMaximo: 55,
        jurosAnual: 12,
        status: "Em atraso"
      },
      {
        id: "BP007",
        credor: "Renner",
        valorOriginal: 980.00,
        valorAtual: 1274.00,
        dataVencimento: "16/06/2024",
        tipo: "Cartão de Loja",
        descontoMaximo: 25,
        jurosAnual: 12,
        status: "Em atraso"
      }
    ]
  },
  {
    nome: "Juliana Ferreira Alves",
    cpf: "98765432105",
    cidade: "Florianópolis",
    estado: "SC",
    dataNascimento: "21/09/1985",
    nomeMae: "Patricia Ferreira", 
    nomePai: "Marcos Alves",
    email: "juliana.alves@uol.com.br",
    telefone: "(48) 95432-1098",
    dividas: [
      {
        id: "BP008",
        credor: "C6 Bank",
        valorOriginal: 3600.00,
        valorAtual: 4680.00,
        dataVencimento: "12/03/2024",
        tipo: "Cartão de Crédito",
        descontoMaximo: 38,
        jurosAnual: 12,
        status: "Em atraso"
      },
      {
        id: "BP009",
        credor: "PicPay",
        valorOriginal: 1200.00,
        valorAtual: 1560.00,
        dataVencimento: "25/08/2024",
        tipo: "Empréstimo Digital",
        descontoMaximo: 30,
        jurosAnual: 12,
        status: "Em atraso"
      }
    ]
  },
  {
    nome: "Boris Mesel",
    cpf: "09390415888",
    cidade: "São Paulo",
    estado: "SP",
    dataNascimento: "28/03/1969",
    nomeMae: "Sara Mesel",
    nomePai: "Israel Mesel",
    email: "Boris.mesel@grupoabl.com.br",
    telefone: "(11) 98149-6959",
    dividas: [
      {
        id: "BP010",
        credor: "Banco Itaú",
        valorOriginal: 15000.00,
        valorAtual: 19500.00,
        dataVencimento: "12/05/2024",
        tipo: "Empréstimo Empresarial",
        descontoMaximo: 25,
        jurosAnual: 15,
        status: "Em atraso"
      },
      {
        id: "BP011",
        credor: "Serasa",
        valorOriginal: 2600.00,
        valorAtual: 3300.00,
        dataVencimento: "08/09/2024", 
        tipo: "Negativação Pendente",
        descontoMaximo: 40,
        jurosAnual: 10,
        status: "Em atraso"
      }
    ]
  }
];

// Função para buscar devedor por CPF
export function buscarDevedorPorCPF(cpf: string): Devedor | null {
  return devedoresSample.find(devedor => devedor.cpf === cpf) || null;
}

// Função para buscar devedor por nome
export function buscarDevedorPorNome(nome: string): Devedor[] {
  return devedoresSample.filter(devedor => 
    devedor.nome.toLowerCase().includes(nome.toLowerCase())
  );
}

// Função para calcular total das dívidas
export function calcularTotalDividas(dividas: Divida[]): number {
  return dividas.reduce((total, divida) => total + divida.valorAtual, 0);
}

// Função para calcular parcelas com desconto e juros
export interface CalculoParcela {
  parcelas: number;
  valorParcela: number;
  valorTotal: number;
  desconto: number;
  valorComDesconto: number;
}

export function calcularParcelas(valorOriginal: number, descontoMaximo: number, numeroParcelas: number): CalculoParcela {
  // Aplicar desconto baseado no número de parcelas
  let percentualDesconto = 0;
  
  if (numeroParcelas === 1) {
    percentualDesconto = descontoMaximo; // Desconto máximo à vista
  } else if (numeroParcelas <= 3) {
    percentualDesconto = descontoMaximo * 0.8; // 80% do desconto máximo
  } else if (numeroParcelas <= 6) {
    percentualDesconto = descontoMaximo * 0.6; // 60% do desconto máximo
  } else if (numeroParcelas <= 12) {
    percentualDesconto = descontoMaximo * 0.4; // 40% do desconto máximo
  } else if (numeroParcelas <= 24) {
    percentualDesconto = descontoMaximo * 0.2; // 20% do desconto máximo
  } else {
    percentualDesconto = descontoMaximo * 0.1; // 10% do desconto máximo
  }

  const valorDesconto = valorOriginal * (percentualDesconto / 100);
  const valorComDesconto = valorOriginal - valorDesconto;
  
  // Aplicar juros apenas para parcelamentos (não à vista)
  let valorTotal = valorComDesconto;
  if (numeroParcelas > 1) {
    const jurosMensal = 12 / 12 / 100; // 12% ao ano = 1% ao mês
    valorTotal = valorComDesconto * Math.pow(1 + jurosMensal, numeroParcelas - 1);
  }
  
  const valorParcela = valorTotal / numeroParcelas;

  return {
    parcelas: numeroParcelas,
    valorParcela: Math.round(valorParcela * 100) / 100,
    valorTotal: Math.round(valorTotal * 100) / 100,
    desconto: Math.round(valorDesconto * 100) / 100,
    valorComDesconto: Math.round(valorComDesconto * 100) / 100
  };
}

// Função para calcular parcelas baseado no valor que o cliente pode pagar
export function calcularParcelasPorValor(valorOriginal: number, descontoMaximo: number, valorMensal: number): CalculoParcela | null {
  // Calcular o valor com desconto mínimo (desconto de 10% do máximo para muitas parcelas)
  const percentualDescontoMinimo = descontoMaximo * 0.1;
  const valorComDescontoMinimo = valorOriginal - (valorOriginal * (percentualDescontoMinimo / 100));
  
  // Calcular quantas parcelas seriam necessárias
  const jurosMensal = 12 / 12 / 100; // 1% ao mês
  
  // Fórmula para calcular número de parcelas em financiamento
  // Usando aproximação: n = ln(1 + (VP * i) / PMT) / ln(1 + i)
  // Onde VP = valor presente, i = taxa de juros, PMT = valor da parcela
  
  if (valorMensal >= valorComDescontoMinimo) {
    // Pode pagar à vista
    return calcularParcelas(valorOriginal, descontoMaximo, 1);
  }
  
  // Calcular número aproximado de parcelas
  const numeroParcelas = Math.ceil(
    Math.log(1 + (valorComDescontoMinimo * jurosMensal) / valorMensal) / 
    Math.log(1 + jurosMensal)
  );
  
  if (numeroParcelas > 36) {
    return null; // Não é possível parcelar em mais de 36x
  }
  
  return calcularParcelas(valorOriginal, descontoMaximo, numeroParcelas);
}

// Função para gerar link de pagamento PIX
export function gerarLinkPix(valor: number, codigoProposta: string): string {
  // Gerar QR Code PIX simbólico
  const valorFormatado = valor.toFixed(2).replace('.', ',');
  const chavePixBP = "pagamentos@bellinatiperez.com.br";
  const descricao = `BP ${codigoProposta}`;
  
  // URL simbólica do PIX (em um sistema real seria integrado com PSP)
  return `https://portal.bp.com.vc/pix?valor=${valorFormatado}&ref=${codigoProposta}&chave=${encodeURIComponent(chavePixBP)}&desc=${encodeURIComponent(descricao)}`;
}

// Função para gerar link de boleto
export function gerarLinkBoleto(valor: number, codigoProposta: string): string {
  // URL simbólica do boleto
  const valorFormatado = valor.toFixed(2).replace('.', ',');
  return `https://portal.bp.com.vc/boleto?codigo=${codigoProposta}&valor=${valorFormatado}`;
}