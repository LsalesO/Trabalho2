/* eslint-disable jsx-a11y/label-has-associated-control */
import axios, { AxiosError, AxiosResponse } from 'axios';
import React, { useState, useEffect, FormEvent } from 'react';
import { Link } from 'react-router-dom';

import { Container, Form, Tabela } from './styles';

/* Tipo Icliente que se refere ao cliente que vem da api */
interface ICliente {
  id: string;
  cliente: string;
  telefone: string;
  email: string;
}

/* tipo para se referiri ao cliente que esta sendo cadastrado */
interface INovoCliente {
  cliente: string;
  telefone: string;
  email: string;
}

const Home: React.FC = () => {
  const [cliente, setCliente] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  /* array de clientes do tipo array de CLientes */
  const [clientes, setClientes] = useState<ICliente[]>([]);

  /* quando iniciar a aplicação essa funcao ira rodar e chamar a api para carregar todos clientes */
  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:3333/clients',
    })
      .then((response: AxiosResponse<ICliente[]>) => {
        setClientes(response.data);
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  }, []);

  /* função que vai ser chamada quando o o form for submetido */
  function submitForm(evento: FormEvent<HTMLFormElement>): void {
    evento.preventDefault();
    /* criando o objeto cliente para poder adicionar no array e tipando com ICliente */
    const obj: INovoCliente = {
      cliente,
      telefone,
      email,
    };

    /* chamando a api para cadastrar o cliente */
    axios({
      method: 'post',
      url: 'http://localhost:3333/clients',
      data: obj,
    })
      .then((response: AxiosResponse<ICliente>) => {
        /* depois que a api responder OK vou adicionar esse novo cliente na variavel clientes */
        const novoCliente: ICliente = {
          id: response.data.id,
          cliente: response.data.cliente,
          telefone: response.data.telefone,
          email: response.data.email,
        };
        setClientes([...clientes, novoCliente]);

        /* limpando os campos do form */
        setCliente('');
        setTelefone('');
        setEmail('');
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  }

  function deletarCliente(clienteID: string): void {
    // chama a api passando o id do cliente
    axios({
      method: 'delete',
      url: `http://localhost:3333/clients/${clienteID}`,
    })
      .then((response: AxiosResponse<ICliente>) => {
        // filtra todos clientes agora sem o cliente deletado
        const novosClientes = clientes.filter(cl => {
          return cl.id !== clienteID;
        });
        setClientes(novosClientes);
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  }

  return (
    <Container>
      {/* formulario pra poder cadastrar a o cliente e no evento de submit do form ele chama uma função */}
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

        <button type="submit">Cadastrar Cliente</button>
      </Form>

      {/* Tabela para mostrar os clientes cadastrados */}
      <Tabela>
        <thead>
          <tr>
            <td>nome</td>
            <td>telefone</td>
            <td>email</td>
            <td> </td>
          </tr>
        </thead>

        <tbody>
          {/* loop pelos clientes */}
          {clientes.map(item => {
            return (
              <tr key={item.id}>
                <td> {item.cliente} </td>
                <td> {item.telefone} </td>
                <td> {item.email} </td>
                <td>
                  {/*
                    botões de editar e deletar
                    editar: redireciona para ourta pagina
                    deletar: chama a funcao deletarCliente
                  */}
                  <button type="button">
                    <Link to={`/editar/${item.id}`}>Alterar</Link>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      deletarCliente(item.id);
                    }}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Tabela>
    </Container>
  );
};

export default Home;
