import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import 'jest-styled-components';

import { ToDoItem } from './index';

describe ('<ToDoItem />', () => {
  it ('renders component correctly', () => {
    const defaultValue = 'default value';
    const {container} = render(<ToDoItem label={defaultValue} />);

    const todoItem = screen.getByText(defaultValue);
    expect(todoItem).toBeInTheDocument();

    const deleteButton = screen.getByText('삭제');
    expect(deleteButton).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it ('clicks the delete button', () => {
    const handleClick = jest.fn();
    const defaultValue = 'default value';
    render(<ToDoItem label={defaultValue} onDelete={handleClick} /> );

    const deleteButton = screen.getByText('삭제');
    expect(handleClick).toHaveBeenCalledTimes(0);
    fireEvent.click(deleteButton);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});