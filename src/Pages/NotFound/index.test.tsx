import React from 'react';
import { render, screen } from '@testing-library/react';
import 'jest-styled-components';

import { NotFound } from './index';

describe('<NotFound />', () => {
  it ('render component correctly', () => {
    const { container } = render(<NotFound />);

    const notFoundMsg = 'Not Found 😭';
    const message = screen.getByText(notFoundMsg);
    expect(message).toBeInTheDocument();
    
    expect(container).toMatchSnapshot();
  });
});