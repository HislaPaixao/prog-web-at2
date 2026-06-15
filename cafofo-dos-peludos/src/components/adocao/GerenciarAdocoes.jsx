import React, { useState } from 'react';
import { adocoesBase, petsBase } from '../../data/relatorioData'; // Ajustado para voltar duas pastas (de Adocao para components, de components para src)
import AdocaoForm from './AdocaoForm';
import AdocaoTabela from './AdocaoTabela';

function lerListaLocalStorage(chave, listaPadrao) {
  try {
    const valor = localStorage.getItem(chave);
    if (!valor) return listaPadrao;
    const lista = JSON.parse(valor);
    return Array.isArray(lista) && lista.length > 0 ? lista : listaPadrao;
  } catch {
    return listaPadrao;
  }
}

export default function GerenciarAdocoes() {
  const [pets] = useState(() => lerListaLocalStorage('pets', petsBase));
  const [adocoes, setAdocoes] = useState(() => lerListaLocalStorage('adocoes', adocoesBase));

  const [petId, setPetId] = useState('');
  const [nomeAdotante, setNomeAdotante] = useState('');
  const [status, setStatus] = useState('Pendente');
  const [idEmEdicao, setIdEmEdicao] = useState(null);

  const relatorio = adocoes.map((adocao) => {
    const petRelacionado = pets.find((pet) => pet.id === Number(adocao.petId));
    return {
      ...adocao,
      nomePet: petRelacionado?.nome ?? 'Pet não encontrado',
      especiePet: petRelacionado?.especie ?? '-',
      idadePet: petRelacionado?.idade ?? '-',
    };
  });

  const lidarComSalvar = (e) => {
    e.preventDefault();
    if (!petId || !nomeAdotante) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      return;
    }

    let novasAdocoes;
    if (idEmEdicao !== null) {
      novasAdocoes = adocoes.map((item) =>
        item.id === idEmEdicao ? { ...item, petId: Number(petId), nomeAdotante, status } : item
      );
      setIdEmEdicao(null);
    } else {
      novasAdocoes = [...adocoes, { id: Date.now(), petId: Number(petId), nomeAdotante, status }];
    }

    setAdocoes(novasAdocoes);
    localStorage.setItem('adocoes', JSON.stringify(novasAdocoes));
    window.location.reload();
    limparFormulario();
  };

  const iniciarEdicao = (adocao) => {
    setIdEmEdicao(adocao.id);
    setPetId(adocao.petId);
    setNomeAdotante(adocao.nomeAdotante || adocao.adotante || '');
    setStatus(adocao.status || 'Pendente');
  };

  const eliminarAdocao = (id) => {
    if (window.confirm('Tem a certeza que deseja eliminar esta adoção?')) {
      const listaFiltrada = adocoes.filter((item) => item.id !== id);
      setAdocoes(listaFiltrada);
      localStorage.setItem('adocoes', JSON.stringify(listaFiltrada));
      window.location.reload();
    }
  };

  const limparFormulario = () => {
    setPetId(''); setNomeAdotante(''); setStatus('Pendente'); setIdEmEdicao(null);
  };

  return (
    <section className="container mt-4">
      <AdocaoForm 
        pets={pets} petId={petId} setPetId={setPetId}
        nomeAdotante={nomeAdotante} setNomeAdotante={setNomeAdotante}
        status={status} setStatus={setStatus} idEmEdicao={idEmEdicao}
        lidarComSalvar={lidarComSalvar} limparFormulario={limparFormulario}
      />
      <AdocaoTabela 
        relatorio={relatorio} 
        iniciarEdicao={iniciarEdicao} 
        eliminarAdocao={eliminarAdocao} 
      />
    </section>
  );
}