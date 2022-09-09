import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react';

import App, { calcularNovoSaldo } from './app'

describe('Componente principal', () => {
    describe('Quando eu abro o app do banco', () => {
    it('O nome é exibido', () => {
        render(<App />);

        expect(screen.getByText('ML - Bank')).toBeInTheDocument();
    })
    it('O saldo é exibido', () => {
        render(<App />);

        expect(screen.getByText('Saldo:')).toBeInTheDocument();
    })
    it('O botão "Realizar operação" é exibido', () => {
        render(<App />);

        expect(screen.getByText('Realizar operação')).toBeInTheDocument();
    })

    describe('Quando eu realizo uma transação de saque', () => {
            it('o valor do saldo deve diminuir', () => {
                const valores = {
                    transacao: 'saque',
                    valor: 50
                }
    
                const antigoSaldo = 150
    
                const novoSaldo = calcularNovoSaldo(valores, antigoSaldo)
    
                expect(novoSaldo).toBe(100)
            })
    
            it('maior que o saldo, o mesmo deve ficar negativo', () => {
                const valores = {
                    transacao: 'saque',
                    valor: 150
                }
    
                const antigoSaldo = 50
    
                const novoSaldo = calcularNovoSaldo(valores, antigoSaldo)
    
                expect(novoSaldo).toBe(-100)
            })
    
            it('a transação deve ser realizada', () => {
                render(<App />)
    
                const saldo = screen.getByText('R$ 1000')
                const transacao = screen.getByLabelText('Saque')
                const valor = screen.getByTestId('valor')
                const botaoTransacao = screen.getByText('Realizar operação')
    
                expect(saldo.textContent).toBe('R$ 1000')
    
                fireEvent.click(transacao, {target: { value: 'saque' }})
                fireEvent.change(valor, { target: { value: '100' } })
                fireEvent.click(botaoTransacao)
    
                expect(saldo.textContent).toBe('R$ 900')
            })
        })

        describe('Quando eu realizo uma transação de deposito', () => {
            it('o valor do saldo deve aumentar', () => {
                const valores = {
                    transacao: 'deposito',
                    valor: 50
                }

            const antigoSaldo = 100
            const novoSaldo = calcularNovoSaldo(valores, antigoSaldo)

            expect(novoSaldo).toBe(150)
            })

            it('a transação deve ser realizada', () => {
                render(<App />)
    
                const saldo = screen.getByText('R$ 1000')
                const transacao = screen.getByLabelText('Depósito')
                const valor = screen.getByTestId('valor')
                const botaoTransacao = screen.getByText('Realizar operação')
    
                expect(saldo.textContent).toBe('R$ 1000')
    
                fireEvent.click(transacao, {target: { value: 'deposito' }})
                fireEvent.change(valor, { target: { value: '100' } })
                fireEvent.click(botaoTransacao)
    
                expect(saldo.textContent).toBe('R$ 1100')
            })
        })

    })

})