import Transacoes from "./Transacoes";
import React from 'react'
import { render } from "@testing-library/react";

describe('Lista de transações', () => {
    it('o snapshot da lista de transações deve ser sempre o mesmo', () => {
      const listaDeTransacoes = [
        { id: 1, tipo: 'saque', valor: '20.00', data: '08/09/2020' },
        { id: 2, tipo: 'deposito', valor: '25.00', data: '08/10/2020' },
        { id: 3, tipo: 'saque', valor: '30.00', data: '10/09/2020' }
      ]
  
      const { container } = render(<Transacoes 
        transacoes={listaDeTransacoes}
      />)
  
      expect(container.firstChild).toMatchSnapshot();
    })
  })