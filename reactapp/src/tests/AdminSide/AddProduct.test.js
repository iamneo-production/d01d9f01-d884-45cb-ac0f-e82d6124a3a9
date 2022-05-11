import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddProduct from '../../components/AddProduct/AddProduct';
import { MemoryRouter } from 'react-router';

describe('<AddProduct />', () => {
  test('feAddProduct', () => {
    render(<MemoryRouter><AddProduct /></MemoryRouter>);

    const productName = screen.getByTestId('enterProductName');
    const productPrice = screen.getByTestId('enterProductPrice');
    const productImageUrl = screen.getByTestId('enterProductImageUrl');
    const productQuantity = screen.getByTestId('enterProductQuantity');

    expect(productName).toBeTruthy();
    expect(productPrice).toBeTruthy();
    expect(productImageUrl).toBeTruthy();
    expect(productQuantity).toBeTruthy();

  });
});