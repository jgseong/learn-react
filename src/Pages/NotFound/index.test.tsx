import React from 'react';
import { render, screen } from '@testing-library/react';
import 'jest-styled-components';

import { NotFound } from './index';

const textNotFound = 'Not Found!'

describe('<NotFound />', () => {
  it('renders component correctly', () => {
    const { container } = render(<NotFound />);

    const message = screen.getByText(textNotFound);
    expect(message).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });
});