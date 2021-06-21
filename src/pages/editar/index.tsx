/* eslint-disable jsx-a11y/label-has-associated-control */
import axios, { AxiosError, AxiosResponse } from 'axios';
import React, { useState, useEffect, FormEvent } from 'react';
import { useRouteMatch } from 'react-router-dom';

import { Container, Form } from './styles';

interface ICliente {
  id: string;
  cliente: string;
  telefone: string;
  email: string;
}

interface INovoCliente {
  cliente: string;
  telefone: string;
  email: string;
}

interface clienteParametro {
  id: string;
}

const Home: React.FC = () => {
  const { params } = useRouteMatch<clienteParametro>();
  const [cliente, setCliente] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');

  /* quando a pagina carregar ira chamar a api pegando os detalhes de um clientes especifico */
  useEffect(() => {
    axios({
      method: 'get',
      url: `http://localhost:3333/clients/${params.id}`,
    })
      .then((response: AxiosResponse<ICliente>) => {
        setCliente(response.data.cliente);
        setTelefone(response.data.telefone);
        setEmail(response.data.email);
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  }, []);

  /* função que ira ser chamada quando o form ser submetido para editar o cliente */
  function submitForm(evento: FormEvent<HTMLFormElement>): void {
    evento.preventDefault();
    /* criando o objeto disciplina para poder adicionar no array e tipando com Idisciplina */
    const obj: INovoCliente = {
      cliente,
      telefone,
      email,
    };

    /* chamando api para editar o cliente passando o id do cliente */
    axios({
      method: 'put',
      url: `http://localhost:3333/clients/${params.id}`,
      data: obj,
    })
      .then((response: AxiosResponse<ICliente>) => {
        /* retornando para a pagina inicial quando a api responder OK */
        console.log(response.data);
        window.location.href = '/';
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  }

  return (
    <Container>
      <h1>Editando {cliente}</h1>

      {/* formulario pra poder cadastrar a disciplina e no evento de submit do form ele chama uma função */}
      <Form onSubmit={submitForm}>
        <label>Seu Cliente:</label>
        <input
          placeholder="Seu Cliente"
          value={cliente}
          onChange={(e: any) => {
            setCliente(e.target.value);
          }}
        />

        {/* value representa o valor do input quando e iniciado  */}
        {/* onchange vai refletir o valor do input na variavel  */}
        <label>Telefone do cliente:</label>
        <input
          placeholder="Telefone do cliente"
          value={telefone}
          onChange={(e: any) => {
            setTelefone(e.target.value);
          }}
        />

        <label>E-mail do cliente:</label>
        <input
          placeholder="E-mail do cliente"
          value={email}
          onChange={(e: any) => {
            setEmail(e.target.value);
          }}
        />

        <button type="submit">Editar Cliente</button>
      </Form>
    </Container>
  );
};

export default Home;
