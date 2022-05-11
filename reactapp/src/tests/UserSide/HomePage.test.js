import { queryByTestId, render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router';
import HomePage from '../../components/HomePage/HomePage';


describe('HomePage Component', () => {
    
    render(<MemoryRouter><HomePage /></MemoryRouter>)

    test('feHomePage', () => {
       const  productHomeBody = screen.queryByTestId('productHomeBody');

       expect(productHomeBody).toBeTruthy();
    })

})