import { getByTestId, queryByTestId, render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router';
import View from '../../components/View/View';

describe('Product View Component', () => {
    render(<MemoryRouter><View /></MemoryRouter>);

    test('feViewProduct', () => {
        const orderId = screen.queryByTestId('orderId');
        const userId = screen.queryByTestId('userId');

        expect(orderId).toBeTruthy();
        expect(userId).toBeTruthy();
    })
    
})