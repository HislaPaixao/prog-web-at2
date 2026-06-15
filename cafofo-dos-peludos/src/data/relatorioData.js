export const petsBase = [
  { id: '1', nome: 'Alex', tipo: 'Cachorro', idade: '6 meses', status: 'disponivel' },
  { id: '2', nome: 'Sicha', tipo: 'Cachorro', idade: '3 meses', status: 'adotado' },
  { id: '3', nome: 'Mel', tipo: 'Gato', idade: '8 meses', status: 'disponivel' },
];

export const adocoesBase = [
  { id: '101', petId: '2', adotante: 'Ana Souza', cidade: 'Brasilia - DF', status: 'Aprovada' },
  { id: '102', petId: '1', adotante: 'Carlos Lima', cidade: 'Goiania - GO', status: 'Em analise' },
  {
    id: '103',
    petId: '3',
    adotante: 'Marina Alves',
    cidade: 'Anapolis - GO',
    status: 'Entrevista agendada',
  },
];
