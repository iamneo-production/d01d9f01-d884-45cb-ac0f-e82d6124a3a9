import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router';
import Order from '../../components/Order/Order';

describe ('Order Component' ,() => {
	const {  container } = render(<MemoryRouter><Order /></MemoryRouter>) ;
        
    test('feOrder', () => {
       const  productOrderBody = screen.queryByTestId('productOrderBody');
       const  payButton = screen.queryByTestId('payButton');
	   
	   expect(productOrderBody).toBeTruthy();
	   expect(payButton).toBeTruthy();
    })
})