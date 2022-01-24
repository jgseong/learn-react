import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import 'jest-styled-components';

import { Input } from './index';

describe ('<Input />', () => {
  it ('renders component correctly', () => {
    const {container} = render(<Input value="default value" />);

    const input = screen.getByDisplayValue('default value');
    expect(input).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it ('renders placeholder correctly', () => {
    const defaultPlaceholer = 'default placeholder';
    render(<Input placeholder={defaultPlaceholer} />);

    const input = screen.getByPlaceholderText(defaultPlaceholer);
    expect(input).toBeInTheDocument();
  });

  it ('changes the data', () => {
    const defaultPlaceholer = 'default placeholder';
    render(<Input placeholder={defaultPlaceholer} />);

    const changedValue = 'study react';
    const input = screen.getByPlaceholderText(defaultPlaceholer) as HTMLInputElement;
    fireEvent.change(input, { target: { value: changedValue} });
    expect(input.value).toBe(changedValue);
  });
});