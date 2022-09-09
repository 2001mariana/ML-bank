import { render } from "@testing-library/react"
import Transacao from "./Transacao"
import React from 'react'

describe('Componente de transação de extrato', () => {
    it('snapshot do componente deve permanecer sempre o mesmo', 
        () => {
            const { container } = render(<Transacao
                data="09/09/2022"
                tipo="saque"
                valor="20.00"
            />)

            expect(container.firstChild).toMatchSnapshot();
        })
})